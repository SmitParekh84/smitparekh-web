# Tenant Blog API — Design Spec
**Date:** 2026-05-10  
**Status:** Approved

---

## Overview

Allow any logged-in user to register as a blog tenant. After admin approval they receive an API key they can use to create, update, and publish blog posts via a public REST API — powering their own external tools/sites. Tenant blogs are stored in the existing MongoDB blog collection, scoped by `tenantId`. Nothing is shown on smitparekh.co.in public pages.

---

## 1. Data Model

### New MongoDB model: `Tenant` (`smitparekh-api/models/tenant.model.js`)

| Field | Type | Notes |
|---|---|---|
| `supabaseUserId` | String | Unique. Links to Supabase auth user. |
| `name` | String | From onboarding form. |
| `email` | String | From onboarding form. |
| `tenantSlug` | String | Unique. Auto-generated from name (e.g. `john-doe-abc3`). |
| `apiKey` | String | UUID v4. Generated on registration. Shown to user. |
| `status` | enum | `pending` \| `approved` \| `rejected` \| `suspended` |
| `rejectionReason` | String | Optional. Set on reject. |
| `requestedAt` | Date | Set on registration. |
| `approvedAt` | Date | Set on approval. |
| `approvedBy` | String | Admin email. |
| `isDeleted` | Boolean | Soft delete flag. |
| `deletedAt` | Date | Soft delete timestamp. |

### Extend `blog.model.js` (one field added)

```js
tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', default: null }
```

- **Admin blogs:** `tenantId = null`, filtered by `site` field (unchanged)
- **Tenant blogs:** `tenantId = <ObjectId>`, `site` field ignored
- Existing admin blog queries add `{ tenantId: null }` — tenant blogs never leak into admin lists

---

## 2. API Routes

### Tenant self-service (`smitparekh-api/routes/tenant.routes.js`)
Auth: Supabase JWT (same as existing user routes)

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/tenants/register` | Onboarding: name + email → Tenant doc + apiKey |
| `GET` | `/api/tenants/me` | Get my tenant status, apiKey, slug |
| `POST` | `/api/tenants/me/regenerate-key` | Generate new apiKey, invalidate old |
| `GET` | `/api/tenants/me/blogs` | List all my blogs (draft + published) for dashboard UI — JWT auth, not API key |
| `POST` | `/api/tenants/me/blogs` | Create blog from dashboard — JWT auth |
| `PUT` | `/api/tenants/me/blogs/:id` | Update blog from dashboard — JWT auth |
| `DELETE` | `/api/tenants/me/blogs/:id` | Soft delete from dashboard — JWT auth |
| `PATCH` | `/api/tenants/me/blogs/:id/publish` | Toggle publish from dashboard — JWT auth |

### Admin tenant management (`smitparekh-api/routes/admin-tenant.routes.js`)
Auth: Admin JWT (same guard as existing admin routes)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/tenants` | List all tenants, filter by status |
| `PATCH` | `/api/admin/tenants/:id/approve` | Set status = approved |
| `PATCH` | `/api/admin/tenants/:id/reject` | Set status = rejected + rejectionReason |
| `PATCH` | `/api/admin/tenants/:id/suspend` | Set status = suspended |

### Public Blog API v1 (`smitparekh-api/routes/v1/blog.routes.js`)
Auth: `X-API-Key` header → `middleware/tenant-api-auth.js`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/blogs` | List tenant's blogs (published only; `?all=true` for all) |
| `GET` | `/api/v1/blogs/:id` | Single blog post |
| `POST` | `/api/v1/blogs` | Create blog (tenantId auto-scoped) |
| `PUT` | `/api/v1/blogs/:id` | Update blog (must belong to this tenant) |
| `DELETE` | `/api/v1/blogs/:id` | Soft delete |
| `PATCH` | `/api/v1/blogs/:id/publish` | Toggle isPublished |

### API key middleware (`smitparekh-api/middleware/tenant-api-auth.js`)
1. Read `X-API-Key` header — `400` if missing
2. Lookup `Tenant` by `{ apiKey, isDeleted: false }` — `401` if not found
3. If `status !== 'approved'` → `403 { error: "Tenant pending approval" }`
4. Attach `req.tenant` — all v1 queries filter by `req.tenant._id`
5. Rate limit: 60 req/min per API key via `express-rate-limit`

---

## 3. Frontend Flow

### UserSidebar — Blog section (`components/user/UserSidebar.tsx`)

Collapsible "Blog" nav item. Sub-items are dynamic based on tenant status fetched from `GET /api/tenants/me`:

```
Not registered:
  Blog ▾
  └─ Get Started       → /dashboard/blog/onboarding

Pending / Rejected:
  Blog ▾
  └─ Status            → /dashboard/blog/onboarding  (read-only status view)
  └─ API Docs          → /dashboard/blog/api-docs

Approved:
  Blog ▾
  └─ My Blogs          → /dashboard/blog
  └─ API Docs          → /dashboard/blog/api-docs
  (Get Started hidden)
```

### New pages

#### `/dashboard/blog/onboarding`
Two states rendered on one page:

**State 1 — Registration form** (no tenant exists):
- Fields: Name, Blog description (optional)
- Submit → `POST /api/tenants/register`
- On success → transition to State 2

**State 2 — Post-registration / status** (tenant exists):
- Shows API key with copy button
- Shows status badge: `Pending Approval` / `Rejected (reason)` / `Approved`
- Message: "Your request is under review. You can view the API docs while you wait."
- If rejected: shows reason + option to re-apply

#### `/dashboard/blog`
- Guard: redirect to `/dashboard/blog/onboarding` if not approved
- Blog listing scoped to tenant via `GET /api/tenants/me/blogs` (JWT auth — dashboard never uses the API key directly)
- Create / Edit / Update using existing `BlogForm` component
- Same publish/unpublish toggle as admin blog UI

#### `/dashboard/blog/api-docs`
- Accessible once tenant exists (any status — they need the key even while pending)
- Shows `X-API-Key: <their-key>` pre-filled and copyable
- Documents all 6 v1 endpoints with request/response JSON examples
- Code snippets in fetch and axios

### Admin sidebar — Tenants page

New item under Blogs section in admin sidebar:
- `/admin/tenants` — table: name, email, status badge, date, approve/reject/suspend buttons
- Approve/reject inline with optional rejection reason input

---

## 4. Security & Edge Cases

| Concern | Handling |
|---|---|
| API key entropy | UUID v4 — 122 bits, not guessable |
| API key storage | Plaintext in MongoDB (needed for lookup). Not a password — acceptable for integration keys. |
| Regeneration | Immediately invalidates old key. User warned that live integrations will break. |
| Tenant isolation | Every v1 query appends `{ tenantId: req.tenant._id }`. Enforced in middleware, not client. |
| Admin blog isolation | All existing `/api/blogs/*` queries add `{ tenantId: null }`. Tenant blogs never appear in admin lists. |
| Onboarding guard | `/dashboard/blog` → redirect to onboarding if not approved. `/dashboard/blog/api-docs` → redirect to onboarding if no tenant at all. |
| Admin notification | Email sent to admin on new tenant registration via existing Resend setup. |
| Supabase migrations | None needed — all new data in MongoDB. Supabase handles auth only (already working). |
| Rate limiting | 60 req/min per API key on all `/api/v1/*` routes. |

---

## 5. File Checklist

### smitparekh-api
- `models/tenant.model.js` — new
- `models/blog.model.js` — add `tenantId` field
- `middleware/tenant-api-auth.js` — new
- `routes/tenant.routes.js` — new (self-service)
- `routes/admin-tenant.routes.js` — new (admin)
- `routes/v1/blog.routes.js` — new (public API)
- `controllers/tenant.controller.js` — new
- `controllers/admin-tenant.controller.js` — new
- `controllers/v1/blog.controller.js` — new
- `app.js` — register 3 new route files

### smitparekh-web
- `components/user/UserSidebar.tsx` — add Blog collapsible section
- `hooks/api/use-tenant.ts` — new (GET /api/tenants/me, POST register, regenerate)
- `lib/api/tenant.ts` — new API module
- `lib/api/query-keys.ts` — add tenant keys
- `app/(user)/dashboard/blog/page.tsx` — blog listing (approved only)
- `app/(user)/dashboard/blog/onboarding/page.tsx` — registration + status
- `app/(user)/dashboard/blog/api-docs/page.tsx` — API documentation
- `app/(admin)/admin/tenants/page.tsx` — admin tenant management
- `components/admin/AdminSidebar.tsx` — add Tenants nav item (if sidebar exists)
