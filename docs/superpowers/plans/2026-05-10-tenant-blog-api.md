# Tenant Blog API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow any logged-in user to register as a blog tenant, get admin-approved, receive a UUID API key, and manage blog posts via a scoped REST API — with a collapsible Blog section in the user dashboard sidebar.

**Architecture:** Extend the existing MongoDB `Blog` model with an optional `tenantId` field. A new `Tenant` model holds API keys and approval status. Two auth paths: Supabase JWT for the dashboard UI, `X-API-Key` header for external tools. Admin blogs are scoped by `{ tenantId: null }` so existing queries are unaffected.

**Tech Stack:** Express + Mongoose (smitparekh-api), Next.js 16 App Router + TanStack Query + shadcn sidebar (smitparekh-web), Resend email, UUID v4 from Node `crypto`.

---

## File Map

### smitparekh-api (create unless noted)
- `models/tenant.model.js` — Tenant schema (apiKey, status, supabaseUserId, etc.)
- `models/blog.model.js` — **modify**: add `tenantId` field + index
- `middleware/tenant-api-auth.js` — reads `X-API-Key`, validates, attaches `req.tenant`
- `controllers/tenant.controller.js` — register, getMe, regenerateKey, listMyBlogs + CRUD
- `controllers/admin-tenant.controller.js` — list, approve, reject, suspend
- `controllers/v1/blog.controller.js` — public API blog CRUD (scoped to tenant)
- `routes/tenant.routes.js` — self-service JWT routes
- `routes/admin-tenant.routes.js` — admin JWT routes
- `routes/v1/blog.routes.js` — API-key routes
- `app.js` — **modify**: register 3 new route files, add `X-API-Key` to CORS, add v1 rate limiter

### smitparekh-web (create unless noted)
- `lib/api/tenant.ts` — typed API module for tenant endpoints
- `lib/api/query-keys.ts` — **modify**: add `tenant` and `adminTenants` keys
- `hooks/api/use-tenant.ts` — TanStack Query hooks
- `components/user/UserSidebar.tsx` — **modify**: add collapsible Blog section
- `app/(user)/dashboard/blog/onboarding/page.tsx` — registration + status UI
- `app/(user)/dashboard/blog/page.tsx` — blog listing (approved only)
- `app/(user)/dashboard/blog/[id]/edit/page.tsx` — edit tenant blog
- `app/(user)/dashboard/blog/api-docs/page.tsx` — API documentation
- `app/(admin)/admin/tenants/page.tsx` — admin tenant management
- `components/admin/AdminSidebar.tsx` — **modify**: add Tenants nav item

---

## Task 1: Tenant Model

**Files:**
- Create: `smitparekh-api/models/tenant.model.js`

- [ ] **Step 1: Create the model**

```js
// smitparekh-api/models/tenant.model.js
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

function generateSlug(name) {
  const base = String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const rand = Math.random().toString(36).slice(2, 6);
  return `${base}-${rand}`;
}

const tenantSchema = new mongoose.Schema(
  {
    supabaseUserId: { type: String, required: true, unique: true, index: true },
    name:           { type: String, required: true, trim: true },
    email:          { type: String, required: true, trim: true, lowercase: true },
    tenantSlug:     { type: String, unique: true, index: true },
    apiKey:         { type: String, unique: true, index: true },
    status:         { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending', index: true },
    rejectionReason:{ type: String, default: null },
    requestedAt:    { type: Date, default: Date.now },
    approvedAt:     { type: Date, default: null },
    approvedBy:     { type: String, default: null },
    isDeleted:      { type: Boolean, default: false, index: true },
    deletedAt:      { type: Date, default: null },
  },
  { timestamps: true }
);

tenantSchema.pre('validate', function (next) {
  if (!this.tenantSlug && this.name) this.tenantSlug = generateSlug(this.name);
  if (!this.apiKey) this.apiKey = randomUUID();
  next();
});

export default mongoose.model('Tenant', tenantSchema);
```

- [ ] **Step 2: Verify no syntax errors**

```bash
cd smitparekh-api && node --input-type=module <<'EOF'
import './models/tenant.model.js';
console.log('Tenant model OK');
EOF
```
Expected: `Tenant model OK`

- [ ] **Step 3: Commit**

```bash
git add smitparekh-api/models/tenant.model.js
git commit -m "feat: add Tenant mongoose model with apiKey + slug auto-generation"
```

---

## Task 2: Extend Blog Model with tenantId

**Files:**
- Modify: `smitparekh-api/models/blog.model.js`

- [ ] **Step 1: Add tenantId field and index**

In `blog.model.js`, after the `site` field definition (line 52), add:

```js
    // Tenant scoping. null = admin/site blog. Set = belongs to a registered tenant.
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null, index: true },
```

After the existing `blogSchema.index({ publishedAt: -1 });` line, add:

```js
blogSchema.index({ tenantId: 1, isPublished: 1 });
```

- [ ] **Step 2: Verify**

```bash
cd smitparekh-api && node --input-type=module <<'EOF'
import Blog from './models/blog.model.js';
const fields = Object.keys(Blog.schema.paths);
console.log('tenantId present:', fields.includes('tenantId'));
EOF
```
Expected: `tenantId present: true`

- [ ] **Step 3: Update existing admin getBlogs to exclude tenant blogs**

In `controllers/blog.controller.js`, find the `getBlogs` function. Change:
```js
const filter = { isDeleted: { $ne: true } };
```
to:
```js
const filter = { isDeleted: { $ne: true }, tenantId: null };
```

Do the same for `getDeletedBlogs` — find its filter object and add `tenantId: null`.

- [ ] **Step 4: Commit**

```bash
git add smitparekh-api/models/blog.model.js smitparekh-api/controllers/blog.controller.js
git commit -m "feat: add tenantId to Blog model; scope admin listing to tenantId=null"
```

---

## Task 3: Tenant API Key Middleware

**Files:**
- Create: `smitparekh-api/middleware/tenant-api-auth.js`

- [ ] **Step 1: Create middleware**

```js
// smitparekh-api/middleware/tenant-api-auth.js
import Tenant from '../models/tenant.model.js';

export const requireTenantApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'Missing X-API-Key header' });
  }

  const tenant = await Tenant.findOne({ apiKey, isDeleted: { $ne: true } }).lean();
  if (!tenant) {
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }

  if (tenant.status !== 'approved') {
    const msgs = {
      pending:   'Tenant account is pending admin approval',
      rejected:  'Tenant account was rejected',
      suspended: 'Tenant account is suspended',
    };
    return res.status(403).json({ success: false, message: msgs[tenant.status] ?? 'Access denied' });
  }

  req.tenant = tenant;
  next();
};
```

- [ ] **Step 2: Verify no syntax errors**

```bash
cd smitparekh-api && node --input-type=module <<'EOF'
import './middleware/tenant-api-auth.js';
console.log('tenant-api-auth OK');
EOF
```
Expected: `tenant-api-auth OK`

- [ ] **Step 3: Update app.js CORS to allow X-API-Key header**

In `smitparekh-api/app.js`, find the `allowedHeaders` line and update:
```js
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
```

Also add a per-key rate limiter for v1 routes. After the existing `strictLimiter` definition, add:
```js
const tenantApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['x-api-key'] || req.ip,
});
```

And after `app.use('/api/tools/notify', strictLimiter);`, add:
```js
app.use('/api/v1', tenantApiLimiter);
```

- [ ] **Step 4: Commit**

```bash
git add smitparekh-api/middleware/tenant-api-auth.js smitparekh-api/app.js
git commit -m "feat: add tenant API key auth middleware + CORS X-API-Key + v1 rate limit"
```

---

## Task 4: Tenant Self-Service Controller + Routes (JWT)

**Files:**
- Create: `smitparekh-api/controllers/tenant.controller.js`
- Create: `smitparekh-api/routes/tenant.routes.js`

- [ ] **Step 1: Create the controller**

```js
// smitparekh-api/controllers/tenant.controller.js
import { randomUUID } from 'crypto';
import Tenant from '../models/tenant.model.js';
import Blog from '../models/blog.model.js';

export const registerTenant = async (req, res) => {
  try {
    const { supabaseUserId, email } = req.user;
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(422).json({ success: false, message: 'Name is required' });
    }

    const existing = await Tenant.findOne({ supabaseUserId, isDeleted: { $ne: true } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already registered as tenant', data: existing });
    }

    const tenant = await Tenant.create({ supabaseUserId, email, name: name.trim() });
    res.status(201).json({ success: true, data: tenant });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Tenant slug conflict — try again' });
    }
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

export const getMyTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ supabaseUserId: req.user.supabaseUserId, isDeleted: { $ne: true } }).lean();
    if (!tenant) return res.status(404).json({ success: false, message: 'Not registered as tenant' });
    res.status(200).json({ success: true, data: tenant });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch tenant', error: err.message });
  }
};

export const regenerateApiKey = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ supabaseUserId: req.user.supabaseUserId, isDeleted: { $ne: true } });
    if (!tenant) return res.status(404).json({ success: false, message: 'Not registered as tenant' });
    tenant.apiKey = randomUUID();
    await tenant.save();
    res.status(200).json({ success: true, data: { apiKey: tenant.apiKey } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to regenerate key', error: err.message });
  }
};

// Dashboard blog CRUD — uses JWT, all scoped to this tenant
async function getTenantOrFail(supabaseUserId, res) {
  const tenant = await Tenant.findOne({ supabaseUserId, isDeleted: { $ne: true }, status: 'approved' }).lean();
  if (!tenant) {
    res.status(403).json({ success: false, message: 'Tenant not approved' });
    return null;
  }
  return tenant;
}

export const listMyBlogs = async (req, res) => {
  try {
    const tenant = await getTenantOrFail(req.user.supabaseUserId, res);
    if (!tenant) return;
    const blogs = await Blog.find({ tenantId: tenant._id, isDeleted: { $ne: true } })
      .sort({ createdAt: -1 }).lean().maxTimeMS(5000);
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: err.message });
  }
};

export const createMyBlog = async (req, res) => {
  try {
    const tenant = await getTenantOrFail(req.user.supabaseUserId, res);
    if (!tenant) return;
    const blog = await Blog.create({ ...req.body, tenantId: tenant._id, site: undefined });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create blog', error: err.message });
  }
};

export const updateMyBlog = async (req, res) => {
  try {
    const tenant = await getTenantOrFail(req.user.supabaseUserId, res);
    if (!tenant) return;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, tenantId: tenant._id, isDeleted: { $ne: true } },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update blog', error: err.message });
  }
};

export const deleteMyBlog = async (req, res) => {
  try {
    const tenant = await getTenantOrFail(req.user.supabaseUserId, res);
    if (!tenant) return;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, tenantId: tenant._id, isDeleted: { $ne: true } },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: err.message });
  }
};

export const publishMyBlog = async (req, res) => {
  try {
    const tenant = await getTenantOrFail(req.user.supabaseUserId, res);
    if (!tenant) return;
    const blog = await Blog.findOne({ _id: req.params.id, tenantId: tenant._id, isDeleted: { $ne: true } });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.isPublished = !blog.isPublished;
    if (blog.isPublished) blog.publishedAt = new Date();
    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to toggle publish', error: err.message });
  }
};
```

- [ ] **Step 2: Create the routes**

```js
// smitparekh-api/routes/tenant.routes.js
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  registerTenant, getMyTenant, regenerateApiKey,
  listMyBlogs, createMyBlog, updateMyBlog, deleteMyBlog, publishMyBlog,
} from '../controllers/tenant.controller.js';

const router = express.Router();

router.post('/tenants/register',             verifyToken, registerTenant);
router.get('/tenants/me',                    verifyToken, getMyTenant);
router.post('/tenants/me/regenerate-key',    verifyToken, regenerateApiKey);
router.get('/tenants/me/blogs',              verifyToken, listMyBlogs);
router.post('/tenants/me/blogs',             verifyToken, createMyBlog);
router.put('/tenants/me/blogs/:id',          verifyToken, updateMyBlog);
router.delete('/tenants/me/blogs/:id',       verifyToken, deleteMyBlog);
router.patch('/tenants/me/blogs/:id/publish',verifyToken, publishMyBlog);

export default router;
```

- [ ] **Step 3: Register in app.js**

In `smitparekh-api/app.js`, add at the top with other imports:
```js
import tenantRoutes from './routes/tenant.routes.js';
```

And with the other `app.use` calls:
```js
app.use('/api', tenantRoutes);
```

- [ ] **Step 4: Smoke-test with curl (server must be running)**

```bash
# Should return 401 (no token)
curl -s -X POST http://localhost:5000/api/tenants/register | jq .
```
Expected: `{"success":false,"message":"No token provided"}`

- [ ] **Step 5: Commit**

```bash
git add smitparekh-api/controllers/tenant.controller.js smitparekh-api/routes/tenant.routes.js smitparekh-api/app.js
git commit -m "feat: tenant self-service routes — register, getMe, regenerate key, dashboard blog CRUD"
```

---

## Task 5: Admin Tenant Controller + Routes

**Files:**
- Create: `smitparekh-api/controllers/admin-tenant.controller.js`
- Create: `smitparekh-api/routes/admin-tenant.routes.js`

- [ ] **Step 1: Create admin controller**

```js
// smitparekh-api/controllers/admin-tenant.controller.js
import Tenant from '../models/tenant.model.js';

export const listTenants = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { isDeleted: { $ne: true } };
    if (status) filter.status = status;
    const tenants = await Tenant.find(filter).sort({ requestedAt: -1 }).lean().maxTimeMS(5000);
    res.status(200).json({ success: true, count: tenants.length, data: tenants });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch tenants', error: err.message });
  }
};

export const approveTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'approved', approvedAt: new Date(), approvedBy: req.user.email, rejectionReason: null } },
      { new: true }
    );
    if (!tenant) return res.status(404).json({ success: false, message: 'Tenant not found' });
    res.status(200).json({ success: true, data: tenant });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to approve tenant', error: err.message });
  }
};

export const rejectTenant = async (req, res) => {
  try {
    const { reason } = req.body;
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'rejected', rejectionReason: reason ?? null } },
      { new: true }
    );
    if (!tenant) return res.status(404).json({ success: false, message: 'Tenant not found' });
    res.status(200).json({ success: true, data: tenant });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reject tenant', error: err.message });
  }
};

export const suspendTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'suspended' } },
      { new: true }
    );
    if (!tenant) return res.status(404).json({ success: false, message: 'Tenant not found' });
    res.status(200).json({ success: true, data: tenant });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to suspend tenant', error: err.message });
  }
};
```

- [ ] **Step 2: Create admin routes**

```js
// smitparekh-api/routes/admin-tenant.routes.js
import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';
import { listTenants, approveTenant, rejectTenant, suspendTenant } from '../controllers/admin-tenant.controller.js';

const router = express.Router();
const adminOnly = [verifyToken, requireRole('admin', 'superadmin')];

router.get('/admin/tenants',                  ...adminOnly, listTenants);
router.patch('/admin/tenants/:id/approve',    ...adminOnly, approveTenant);
router.patch('/admin/tenants/:id/reject',     ...adminOnly, rejectTenant);
router.patch('/admin/tenants/:id/suspend',    ...adminOnly, suspendTenant);

export default router;
```

- [ ] **Step 3: Register in app.js**

Add import:
```js
import adminTenantRoutes from './routes/admin-tenant.routes.js';
```

Add usage:
```js
app.use('/api', adminTenantRoutes);
```

- [ ] **Step 4: Smoke-test**

```bash
curl -s http://localhost:5000/api/admin/tenants | jq .
```
Expected: `{"success":false,"message":"No token provided"}`

- [ ] **Step 5: Commit**

```bash
git add smitparekh-api/controllers/admin-tenant.controller.js smitparekh-api/routes/admin-tenant.routes.js smitparekh-api/app.js
git commit -m "feat: admin tenant routes — list, approve, reject, suspend"
```

---

## Task 6: V1 Public Blog API (API Key Auth)

**Files:**
- Create: `smitparekh-api/controllers/v1/blog.controller.js`
- Create: `smitparekh-api/routes/v1/blog.routes.js`

- [ ] **Step 1: Create v1 directory and controller**

```bash
mkdir -p smitparekh-api/controllers/v1 smitparekh-api/routes/v1
```

```js
// smitparekh-api/controllers/v1/blog.controller.js
import Blog from '../../models/blog.model.js';

export const listBlogs = async (req, res) => {
  try {
    const filter = { tenantId: req.tenant._id, isDeleted: { $ne: true } };
    if (req.query.all !== 'true') filter.isPublished = true;
    const blogs = await Blog.find(filter).sort({ publishedAt: -1 }).lean().maxTimeMS(5000);
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: err.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, tenantId: req.tenant._id, isDeleted: { $ne: true } }).lean();
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog', error: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, tenantId: req.tenant._id, site: undefined });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create blog', error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenant._id, isDeleted: { $ne: true } },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update blog', error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenant._id, isDeleted: { $ne: true } },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: err.message });
  }
};

export const publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, tenantId: req.tenant._id, isDeleted: { $ne: true } });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.isPublished = !blog.isPublished;
    if (blog.isPublished) blog.publishedAt = new Date();
    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to toggle publish', error: err.message });
  }
};
```

- [ ] **Step 2: Create v1 routes**

```js
// smitparekh-api/routes/v1/blog.routes.js
import express from 'express';
import { requireTenantApiKey } from '../../middleware/tenant-api-auth.js';
import { listBlogs, getBlog, createBlog, updateBlog, deleteBlog, publishBlog } from '../../controllers/v1/blog.controller.js';

const router = express.Router();

router.get('/',         requireTenantApiKey, listBlogs);
router.get('/:id',      requireTenantApiKey, getBlog);
router.post('/',        requireTenantApiKey, createBlog);
router.put('/:id',      requireTenantApiKey, updateBlog);
router.delete('/:id',   requireTenantApiKey, deleteBlog);
router.patch('/:id/publish', requireTenantApiKey, publishBlog);

export default router;
```

- [ ] **Step 3: Register in app.js**

Add import:
```js
import v1BlogRoutes from './routes/v1/blog.routes.js';
```

Add usage (before `app.use('/api/*', notFoundHandler)`):
```js
app.use('/api/v1/blogs', v1BlogRoutes);
```

- [ ] **Step 4: Smoke-test**

```bash
curl -s http://localhost:5000/api/v1/blogs | jq .
```
Expected: `{"success":false,"message":"Missing X-API-Key header"}`

```bash
curl -s -H "X-API-Key: bad-key" http://localhost:5000/api/v1/blogs | jq .
```
Expected: `{"success":false,"message":"Invalid API key"}`

- [ ] **Step 5: Commit**

```bash
git add smitparekh-api/controllers/v1/ smitparekh-api/routes/v1/ smitparekh-api/app.js
git commit -m "feat: v1 public blog API — full CRUD scoped by X-API-Key tenant"
```

---

## Task 7: Frontend API Module + Query Keys

**Files:**
- Create: `smitparekh-web/lib/api/tenant.ts`
- Modify: `smitparekh-web/lib/api/query-keys.ts`

- [ ] **Step 1: Create the API module**

```ts
// smitparekh-web/lib/api/tenant.ts
import { api } from "./client";

export interface Tenant {
  _id: string;
  supabaseUserId: string;
  name: string;
  email: string;
  tenantSlug: string;
  apiKey: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  rejectionReason: string | null;
  requestedAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

export interface TenantBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readMinutes: number;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTenant extends Tenant {}

export const tenantApi = {
  register:       (data: { name: string }) =>
    api.post<{ success: boolean; data: Tenant }>("/tenants/register", data),
  getMe:          () =>
    api.get<{ success: boolean; data: Tenant }>("/tenants/me"),
  regenerateKey:  () =>
    api.post<{ success: boolean; data: { apiKey: string } }>("/tenants/me/regenerate-key"),

  listMyBlogs:    () =>
    api.get<{ success: boolean; count: number; data: TenantBlog[] }>("/tenants/me/blogs"),
  createMyBlog:   (data: Partial<TenantBlog>) =>
    api.post<{ success: boolean; data: TenantBlog }>("/tenants/me/blogs", data),
  updateMyBlog:   (id: string, data: Partial<TenantBlog>) =>
    api.put<{ success: boolean; data: TenantBlog }>(`/tenants/me/blogs/${id}`, data),
  deleteMyBlog:   (id: string) =>
    api.del<{ success: boolean }>(`/tenants/me/blogs/${id}`),
  publishMyBlog:  (id: string) =>
    api.patch<{ success: boolean; data: TenantBlog }>(`/tenants/me/blogs/${id}/publish`),
};

export const adminTenantApi = {
  list:    (status?: string) =>
    api.get<{ success: boolean; count: number; data: AdminTenant[] }>(
      status ? `/admin/tenants?status=${status}` : "/admin/tenants"
    ),
  approve: (id: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/approve`),
  reject:  (id: string, reason?: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/reject`, { reason }),
  suspend: (id: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/suspend`),
};
```

- [ ] **Step 2: Add query keys**

In `smitparekh-web/lib/api/query-keys.ts`, add before the closing `} as const;`:

```ts
  tenant: {
    all: ["tenant"] as const,
    me: () => [...queryKeys.tenant.all, "me"] as const,
    myBlogs: () => [...queryKeys.tenant.all, "my-blogs"] as const,
  },
  adminTenants: {
    all: ["admin-tenants"] as const,
    list: (status?: string) => [...queryKeys.adminTenants.all, "list", status ?? "all"] as const,
  },
```

- [ ] **Step 3: Commit**

```bash
git add smitparekh-web/lib/api/tenant.ts smitparekh-web/lib/api/query-keys.ts
git commit -m "feat: tenant API module + query keys"
```

---

## Task 8: Frontend Hooks

**Files:**
- Create: `smitparekh-web/hooks/api/use-tenant.ts`

- [ ] **Step 1: Create hooks**

```ts
// smitparekh-web/hooks/api/use-tenant.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { tenantApi, adminTenantApi } from "@/lib/api/tenant";
import { queryKeys } from "@/lib/api/query-keys";
import { toast } from "@/lib/toast";

export function useMyTenant() {
  return useQuery({
    queryKey: queryKeys.tenant.me(),
    queryFn: async () => {
      try {
        const res = await tenantApi.getMe();
        return res.data;
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
    retry: false,
  });
}

export function useRegisterTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => tenantApi.register(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Registered!", "Your blog tenant request has been submitted.");
    },
    onError: (err: ApiError) => toast.error("Registration failed", err.message),
  });
}

export function useRegenerateApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => tenantApi.regenerateKey(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Key regenerated", "Your old API key is now invalid.");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useMyBlogs() {
  return useQuery({
    queryKey: queryKeys.tenant.myBlogs(),
    queryFn: () => tenantApi.listMyBlogs().then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useCreateMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tenantApi.createMyBlog,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() }),
    onError: (err: ApiError) => toast.error("Failed to create blog", err.message),
  });
}

export function useUpdateMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof tenantApi.updateMyBlog>[1] }) =>
      tenantApi.updateMyBlog(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() });
      toast.success("Blog updated");
    },
    onError: (err: ApiError) => toast.error("Failed to update blog", err.message),
  });
}

export function useDeleteMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tenantApi.deleteMyBlog(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() });
      toast.success("Blog deleted");
    },
    onError: (err: ApiError) => toast.error("Failed to delete blog", err.message),
  });
}

export function usePublishMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tenantApi.publishMyBlog(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() }),
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

// Admin hooks
export function useAdminTenants(status?: string) {
  return useQuery({
    queryKey: queryKeys.adminTenants.list(status),
    queryFn: () => adminTenantApi.list(status).then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useApproveTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant approved");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useRejectTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => adminTenantApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant rejected");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useSuspendTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.suspend(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant suspended");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-web/hooks/api/use-tenant.ts
git commit -m "feat: tenant TanStack Query hooks — user + admin"
```

---

## Task 9: UserSidebar — Blog Collapsible Section

**Files:**
- Modify: `smitparekh-web/components/user/UserSidebar.tsx`

- [ ] **Step 1: Add Blog section to UserSidebar**

Replace the entire file content with this (preserves all existing code, adds Blog section):

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  ExternalLink,
  LogOut,
  ChevronsUpDown,
  Settings,
  FileText,
  BookOpen,
  Code2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { useMyTenant } from "@/hooks/api/use-tenant";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV_MAIN = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Tools", href: "/dashboard/tools", icon: Wrench },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

const NAV_LINKS = [
  { title: "Free Tools", href: "/free-tools", icon: ExternalLink },
  { title: "View site", href: "/", icon: ExternalLink },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BlogNavSection({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(() => pathname.startsWith("/dashboard/blog"));
  const { data: tenant, isLoading } = useMyTenant();

  const isBlogActive = pathname.startsWith("/dashboard/blog");

  const subItems = (() => {
    if (isLoading) return null;
    if (!tenant) {
      return [{ title: "Get Started", href: "/dashboard/blog/onboarding", icon: BookOpen }];
    }
    if (tenant.status === "pending" || tenant.status === "rejected") {
      return [
        { title: "Status", href: "/dashboard/blog/onboarding", icon: BookOpen },
        { title: "API Docs", href: "/dashboard/blog/api-docs", icon: Code2 },
      ];
    }
    // approved or suspended
    return [
      { title: "My Blogs", href: "/dashboard/blog", icon: FileText },
      { title: "API Docs", href: "/dashboard/blog/api-docs", icon: Code2 },
    ];
  })();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isBlogActive}
        tooltip="Blog"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>Blog</span>
        <ChevronRight
          className={cn(
            "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </SidebarMenuButton>

      {open && subItems && (
        <SidebarMenuSub>
          {subItems.map((item) => (
            <SidebarMenuSubItem key={item.href}>
              <SidebarMenuSubButton
                render={<Link href={item.href} />}
                isActive={isActive(pathname, item.href)}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSupabaseSession();

  const meta = session?.user?.user_metadata ?? {};
  const displayName: string =
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    session?.user?.email ??
    "User";
  const avatarUrl: string | undefined = meta.avatar_url as string | undefined;
  const email: string = session?.user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-500 text-white text-xs font-bold shrink-0">
                {initials || "U"}
              </div>
              <div className="flex flex-col gap-0.5 leading-none min-w-0">
                <span className="font-semibold text-sm">My Dashboard</span>
                <span className="text-xs text-muted-foreground truncate">
                  {siteConfig.name}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isActive(pathname, item.href)}
                    tooltip={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <BlogNavSection pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Quick links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_LINKS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} target="_blank" rel="noreferrer" />}
                    tooltip={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  />
                }
              >
                <Avatar className="h-7 w-7 rounded-lg shrink-0">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                  <AvatarFallback className="rounded-lg bg-blue-500/15 text-blue-500 text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none min-w-0">
                  <span className="font-semibold text-sm truncate">{displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium truncate">{displayName}</span>
                    <span className="text-xs text-muted-foreground truncate">{email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd smitparekh-web && pnpm build 2>&1 | grep -E "error|Error" | head -20
```
Expected: no TypeScript errors relating to UserSidebar.

- [ ] **Step 3: Commit**

```bash
git add smitparekh-web/components/user/UserSidebar.tsx
git commit -m "feat: add Blog collapsible section to UserSidebar — state-driven sub-items"
```

---

## Task 10: Onboarding Page

**Files:**
- Create: `smitparekh-web/app/(user)/dashboard/blog/onboarding/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// smitparekh-web/app/(user)/dashboard/blog/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle, Copy, Check, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyTenant, useRegisterTenant } from "@/hooks/api/use-tenant";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
      title="Copy"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const STATUS_CONFIG = {
  pending:  { icon: Clock,       color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", label: "Pending Approval" },
  approved: { icon: CheckCircle, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",   label: "Approved" },
  rejected: { icon: XCircle,     color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",           label: "Rejected" },
  suspended:{ icon: XCircle,     color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",       label: "Suspended" },
} as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { data: tenant, isLoading } = useMyTenant();
  const register = useRegisterTenant();
  const [name, setName] = useState("");

  if (isLoading) {
    return (
      <div className="max-w-lg space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  // Not registered yet — show registration form
  if (!tenant) {
    return (
      <div className="max-w-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Set up your Blog API</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Register to get an API key you can use to manage blog posts from your own tools and sites.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create your tenant account</CardTitle>
            <CardDescription>Takes 10 seconds. Admin approves within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Your name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                disabled={register.isPending}
              />
            </div>
            <Button
              onClick={() => register.mutate({ name }, { onSuccess: () => {} })}
              disabled={!name.trim() || register.isPending}
              className="w-full"
            >
              {register.isPending ? "Registering…" : "Register & get API key"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Already registered — show status + API key
  if (tenant.status === "approved") {
    router.replace("/dashboard/blog");
    return null;
  }

  const cfg = STATUS_CONFIG[tenant.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Blog API</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Your request is under review. Here are your credentials — save your API key now.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-3">
          <StatusIcon className="h-5 w-5" />
          <div className="space-y-0.5">
            <CardTitle className="text-base">Account status</CardTitle>
            <Badge className={cn("text-xs font-medium border-0", cfg.color)}>{cfg.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tenant.status === "rejected" && tenant.rejectionReason && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              Reason: {tenant.rejectionReason}
            </p>
          )}

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your API Key</p>
            <div className="flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-sm">
              <span className="truncate">{tenant.apiKey}</span>
              <CopyButton text={tenant.apiKey} />
            </div>
            <p className="text-xs text-muted-foreground">
              Use this key in the <code className="text-xs bg-muted px-1 rounded">X-API-Key</code> header. Keep it secret.
            </p>
          </div>

          <Link
            href="/dashboard/blog/api-docs"
            className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
          >
            <BookOpen className="h-4 w-4" />
            View API Documentation
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-web/app/\(user\)/dashboard/blog/onboarding/page.tsx
git commit -m "feat: tenant onboarding page — registration form + post-registration status + API key display"
```

---

## Task 11: Blog Listing Page (Dashboard)

**Files:**
- Create: `smitparekh-web/app/(user)/dashboard/blog/page.tsx`
- Create: `smitparekh-web/app/(user)/dashboard/blog/[id]/edit/page.tsx`

- [ ] **Step 1: Create blog listing page**

```tsx
// smitparekh-web/app/(user)/dashboard/blog/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useMyTenant, useMyBlogs, useDeleteMyBlog, usePublishMyBlog } from "@/hooks/api/use-tenant";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { TenantBlog } from "@/lib/api/tenant";

function BlogRow({ blog, onDelete, onTogglePublish }: {
  blog: TenantBlog;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border/50 last:border-0">
      <div className="min-w-0 space-y-1">
        <p className="font-medium text-sm truncate">{blog.title}</p>
        <p className="text-xs text-muted-foreground truncate">{blog.excerpt}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              blog.isPublished
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                : "bg-muted text-muted-foreground"
            )}
          >
            {blog.isPublished ? "Published" : "Draft"}
          </Badge>
          {blog.category && (
            <span className="text-xs text-muted-foreground">{blog.category}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onTogglePublish(blog._id)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          title={blog.isPublished ? "Unpublish" : "Publish"}
        >
          {blog.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <Link
          href={`/dashboard/blog/${blog._id}/edit`}
          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={() => {
            if (confirm("Delete this blog post?")) onDelete(blog._id);
          }}
          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function TenantBlogListPage() {
  const router = useRouter();
  const { data: tenant, isLoading: tenantLoading } = useMyTenant();
  const { data: blogs, isLoading: blogsLoading } = useMyBlogs();
  const deleteMyBlog = useDeleteMyBlog();
  const publishMyBlog = usePublishMyBlog();

  if (tenantLoading) return <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</div>;

  if (!tenant || tenant.status !== "approved") {
    router.replace("/dashboard/blog/onboarding");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Blogs</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your blog posts via dashboard or API.</p>
        </div>
        <Link href="/dashboard/blog/new" className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      <Card>
        <CardContent className="p-0 px-6">
          {blogsLoading ? (
            <div className="space-y-4 py-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full" />)}</div>
          ) : (blogs ?? []).length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-muted-foreground text-sm">No blog posts yet.</p>
              <Link href="/dashboard/blog/new" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
                <Plus className="h-4 w-4" /> Write your first post
              </Link>
            </div>
          ) : (
            (blogs ?? []).map((blog) => (
              <BlogRow
                key={blog._id}
                blog={blog}
                onDelete={(id) => deleteMyBlog.mutate(id)}
                onTogglePublish={(id) => publishMyBlog.mutate(id)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Create edit page (new and edit share the same form)**

```tsx
// smitparekh-web/app/(user)/dashboard/blog/[id]/edit/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyBlogs, useUpdateMyBlog } from "@/hooks/api/use-tenant";
import { Skeleton } from "@/components/ui/skeleton";
import type { TenantBlog } from "@/lib/api/tenant";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: blogs, isLoading } = useMyBlogs();
  const updateBlog = useUpdateMyBlog();

  const blog = (blogs ?? []).find((b: TenantBlog) => b._id === id);

  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "", coverImage: "" });

  useEffect(() => {
    if (blog) setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category ?? "", coverImage: blog.coverImage ?? "" });
  }, [blog]);

  if (isLoading) return <div className="space-y-4 max-w-2xl">{[1,2,3,4].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>;
  if (!blog) return <p className="text-muted-foreground text-sm">Blog not found.</p>;

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSave() {
    await updateBlog.mutateAsync({ id, data: form });
    router.push("/dashboard/blog");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Post</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{blog.title}</p>
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input value={form.title} onChange={handleChange("title")} placeholder="Post title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea value={form.excerpt} onChange={handleChange("excerpt")} placeholder="Short description (max 320 chars)" rows={2} maxLength={320} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Content (Markdown)</label>
            <Textarea value={form.content} onChange={handleChange("content")} placeholder="Write your post in Markdown…" rows={12} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Input value={form.category} onChange={handleChange("category")} placeholder="General" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input value={form.coverImage} onChange={handleChange("coverImage")} placeholder="https://…" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={updateBlog.isPending}>
              {updateBlog.isPending ? "Saving…" : "Save changes"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/blog")}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add smitparekh-web/app/\(user\)/dashboard/blog/
git commit -m "feat: tenant blog listing page + edit page"
```

---

## Task 12: API Docs Page

**Files:**
- Create: `smitparekh-web/app/(user)/dashboard/blog/api-docs/page.tsx`

- [ ] **Step 1: Create the docs page**

```tsx
// smitparekh-web/app/(user)/dashboard/blog/api-docs/page.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyTenant, useRegenerateApiKey } from "@/hooks/api/use-tenant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ?? "https://api.smitparekh.co.in";

function Code({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className={cn("relative group rounded-lg bg-neutral-950 dark:bg-neutral-900 text-neutral-100 text-xs font-mono p-4 overflow-x-auto", className)}>
      <pre className="whitespace-pre-wrap break-all">{children}</pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-white/10 hover:bg-white/20"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

const METHOD_COLORS: Record<string, string> = {
  GET:    "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  POST:   "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  PUT:    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  PATCH:  "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};

interface Endpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/api/v1/blogs",
    description: "List your published blogs. Add ?all=true to include drafts.",
    response: `{ "success": true, "count": 2, "data": [{ "_id": "…", "title": "…", "isPublished": true, … }] }`,
  },
  {
    method: "GET", path: "/api/v1/blogs/:id",
    description: "Get a single blog post by MongoDB ID.",
    response: `{ "success": true, "data": { "_id": "…", "title": "…", "content": "…" } }`,
  },
  {
    method: "POST", path: "/api/v1/blogs",
    description: "Create a new blog post (starts as draft).",
    requestBody: `{ "title": "My First Post", "excerpt": "Short summary (max 320 chars)", "content": "# Heading\\n\\nMarkdown content…", "category": "General", "tags": ["tag1"], "author": "Jane" }`,
    response: `{ "success": true, "data": { "_id": "…", "isPublished": false, … } }`,
  },
  {
    method: "PUT", path: "/api/v1/blogs/:id",
    description: "Replace blog fields. Send only the fields you want to update.",
    requestBody: `{ "title": "Updated Title", "content": "New content…" }`,
    response: `{ "success": true, "data": { "_id": "…", "title": "Updated Title", … } }`,
  },
  {
    method: "PATCH", path: "/api/v1/blogs/:id/publish",
    description: "Toggle published state. Publishes if draft, unpublishes if live.",
    response: `{ "success": true, "data": { "_id": "…", "isPublished": true, … } }`,
  },
  {
    method: "DELETE", path: "/api/v1/blogs/:id",
    description: "Soft-delete a blog post. It can be restored by admin if needed.",
    response: `{ "success": true, "message": "Blog deleted" }`,
  },
];

export default function ApiDocsPage() {
  const { data: tenant, isLoading } = useMyTenant();
  const regenerate = useRegenerateApiKey();

  const apiKey = tenant?.apiKey ?? "YOUR_API_KEY";

  const fetchExample = (ep: Endpoint) => {
    const hasBody = ep.requestBody;
    return `fetch("${API_BASE}${ep.path.replace(":id", "<blog-id>")}", {
  method: "${ep.method}",
  headers: {
    "X-API-Key": "${apiKey}",
    "Content-Type": "application/json",
  },${hasBody ? `\n  body: JSON.stringify(${ep.requestBody}),` : ""}
})
  .then(res => res.json())
  .then(console.log);`;
  };

  if (isLoading) {
    return <div className="max-w-3xl space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}</div>;
  }

  if (!tenant) {
    return (
      <div className="max-w-md text-center py-16 space-y-3">
        <p className="text-muted-foreground text-sm">Register as a tenant first to see your API docs.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Blog API Documentation</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Use these endpoints to manage your blog from any tool or site.
        </p>
      </div>

      {/* API Key */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your API Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Code>{apiKey}</Code>
          <p className="text-xs text-muted-foreground">
            Pass this in every request as the <code className="bg-muted px-1 rounded text-xs">X-API-Key</code> header.
            Keep it secret — anyone with this key can manage your blogs.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { if (confirm("Regenerate? Your current key will stop working immediately.")) regenerate.mutate(); }}
            disabled={regenerate.isPending}
          >
            {regenerate.isPending ? "Regenerating…" : "Regenerate key"}
          </Button>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card>
        <CardHeader><CardTitle className="text-base">Base URL</CardTitle></CardHeader>
        <CardContent>
          <Code>{API_BASE}</Code>
          <p className="text-xs text-muted-foreground mt-2">All endpoints are prefixed with <code className="bg-muted px-1 rounded text-xs">/api/v1/blogs</code>.</p>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Endpoints</h3>
        {ENDPOINTS.map((ep) => (
          <Card key={`${ep.method}-${ep.path}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2.5">
                <Badge className={cn("font-mono text-xs border-0", METHOD_COLORS[ep.method])}>{ep.method}</Badge>
                <code className="text-sm font-mono">{ep.path}</code>
              </div>
              <p className="text-sm text-muted-foreground">{ep.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {ep.requestBody && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Request Body</p>
                  <Code>{ep.requestBody}</Code>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response</p>
                <Code>{ep.response}</Code>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example (fetch)</p>
                <Code>{fetchExample(ep)}</Code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-web/app/\(user\)/dashboard/blog/api-docs/page.tsx
git commit -m "feat: API docs page — endpoint reference with pre-filled API key + copy buttons"
```

---

## Task 13: Admin Tenants Page + Sidebar

**Files:**
- Create: `smitparekh-web/app/(admin)/admin/tenants/page.tsx`
- Modify: `smitparekh-web/components/admin/AdminSidebar.tsx`

- [ ] **Step 1: Add Tenants to AdminSidebar NAV_MAIN**

In `AdminSidebar.tsx`, find the `NAV_MAIN` array. Add after the Blog item:

```ts
{ title: "Tenants", href: "/admin/tenants", icon: Building2 },
```

Add `Building2` to the lucide-react import at the top of the file.

- [ ] **Step 2: Create admin tenants page**

```tsx
// smitparekh-web/app/(admin)/admin/tenants/page.tsx
"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Pause, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminTenants,
  useApproveTenant,
  useRejectTenant,
  useSuspendTenant,
} from "@/hooks/api/use-tenant";
import { AppSelect } from "@/components/ui/app-select";
import type { AdminTenant } from "@/lib/api/tenant";
import { cn } from "@/lib/utils";

const STATUS_BADGE: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  suspended:"bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

function TenantRow({ tenant }: { tenant: AdminTenant }) {
  const approve = useApproveTenant();
  const reject = useRejectTenant();
  const suspend = useSuspendTenant();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-border/50 last:border-0">
      <div className="min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{tenant.name}</p>
          <Badge className={cn("text-xs border-0 capitalize", STATUS_BADGE[tenant.status])}>{tenant.status}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{tenant.email}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {new Date(tenant.requestedAt).toLocaleDateString()}
        </p>
        {tenant.status === "rejected" && tenant.rejectionReason && (
          <p className="text-xs text-destructive">Reason: {tenant.rejectionReason}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        {tenant.status === "pending" && (
          <>
            <Button size="sm" variant="outline" className="gap-1.5 text-green-700 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-950"
              onClick={() => approve.mutate(tenant._id)} disabled={approve.isPending}>
              <CheckCircle className="h-3.5 w-3.5" /> Approve
            </Button>
            {!showRejectInput ? (
              <Button size="sm" variant="outline" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => setShowRejectInput(true)}>
                <XCircle className="h-3.5 w-3.5" /> Reject
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason (optional)" className="h-8 text-xs w-40" />
                <Button size="sm" variant="destructive" onClick={() => { reject.mutate({ id: tenant._id, reason: rejectReason }); setShowRejectInput(false); }}
                  disabled={reject.isPending}>
                  Confirm
                </Button>
              </div>
            )}
          </>
        )}
        {tenant.status === "approved" && (
          <Button size="sm" variant="outline" className="gap-1.5 text-muted-foreground"
            onClick={() => suspend.mutate(tenant._id)} disabled={suspend.isPending}>
            <Pause className="h-3.5 w-3.5" /> Suspend
          </Button>
        )}
        {(tenant.status === "rejected" || tenant.status === "suspended") && (
          <Button size="sm" variant="outline" className="gap-1.5 text-green-700 border-green-300 hover:bg-green-50 dark:text-green-400"
            onClick={() => approve.mutate(tenant._id)} disabled={approve.isPending}>
            <CheckCircle className="h-3.5 w-3.5" /> Re-approve
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AdminTenantsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: tenants, isLoading } = useAdminTenants(statusFilter === "all" ? undefined : statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Tenants</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Approve or reject tenant API access requests.</p>
        </div>
        <AppSelect
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={[
            { value: "all",      label: "All statuses" },
            { value: "pending",  label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
            { value: "suspended",label: "Suspended" },
          ]}
          triggerClassName="w-36"
        />
      </div>

      <Card>
        <CardContent className="p-0 px-6">
          {isLoading ? (
            <div className="space-y-4 py-4">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>
          ) : (tenants ?? []).length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">No tenants found.</p>
            </div>
          ) : (
            (tenants ?? []).map((t) => <TenantRow key={t._id} tenant={t} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
cd smitparekh-web && pnpm build 2>&1 | grep -E "error TS" | head -20
```
Expected: no new TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add smitparekh-web/app/\(admin\)/admin/tenants/page.tsx smitparekh-web/components/admin/AdminSidebar.tsx
git commit -m "feat: admin tenants page + AdminSidebar Tenants nav item"
```

---

## Task 14: Final Integration Verification

- [ ] **Step 1: Start both servers**

```bash
# Terminal 1
cd smitparekh-api && pnpm dev

# Terminal 2
cd smitparekh-web && pnpm dev
```

- [ ] **Step 2: Test full user flow in browser**

1. Go to `http://localhost:3001/dashboard`
2. Confirm Blog section appears in sidebar with "Get Started" sub-item
3. Click "Get Started" → onboarding page loads
4. Submit registration form → success state shows API key + copy button
5. Sidebar Blog section now shows "Status" + "API Docs"
6. Click "API Docs" → docs page loads with pre-filled API key

- [ ] **Step 3: Test admin approval flow in browser**

1. Log in as admin → go to `/admin/tenants`
2. Confirm pending tenant appears
3. Click Approve → status badge changes to Approved

- [ ] **Step 4: Test v1 API with the approved tenant's key**

```bash
# Replace YOUR_KEY with the actual API key shown on the onboarding page
curl -s -H "X-API-Key: YOUR_KEY" http://localhost:5000/api/v1/blogs | jq .
```
Expected: `{"success":true,"count":0,"data":[]}`

```bash
curl -s -X POST http://localhost:5000/api/v1/blogs \
  -H "X-API-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello World","excerpt":"My first post","content":"# Hello\\n\\nWorld"}' | jq .
```
Expected: `{"success":true,"data":{"_id":"…","title":"Hello World","isPublished":false,…}}`

- [ ] **Step 5: Verify dashboard blog listing shows the created post**

Go to `http://localhost:3001/dashboard/blog` → post should appear.

- [ ] **Step 6: Verify admin blogs are NOT mixed with tenant blogs**

Go to `/admin/blogs` → the "Hello World" post should NOT appear there.

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "feat: complete tenant blog API system — model, routes, middleware, frontend, admin"
```
