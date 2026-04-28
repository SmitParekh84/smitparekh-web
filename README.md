# Smit Parekh - Portfolio (frontend)

Next.js 16 app for the public portfolio + admin dashboard. The frontend talks to a sibling Express API ([`smitparekh-api`](../smitparekh-api)).

---

## Local development (one command for both web + api)

The two repos live as **siblings** on disk:

```
your-workspace/
├── smitparekh-web/   ← this repo
└── smitparekh-api/   ← Express backend
```

### 1. Clone both repos side-by-side

```bash
mkdir SmitParekh-Portfolio && cd SmitParekh-Portfolio
git clone <web-repo-url>  smitparekh-web
git clone <api-repo-url>  smitparekh-api
```

> ⚠️  The folder names **must** be `smitparekh-web` and `smitparekh-api` - the dev script resolves the API via `../smitparekh-api`.

### 2. Configure environment variables

```bash
cp smitparekh-web/.env.example smitparekh-web/.env.local
cp smitparekh-api/.env.example smitparekh-api/.env
# fill in the values in each file
```

### 3. Install deps for both repos

```bash
cd smitparekh-web
pnpm setup        # installs web deps + api deps in one go
```

### 4. Run web + api together

```bash
pnpm dev
```

This boots:
- `web` → Next.js on `http://localhost:3000`
- `api` → Express on `http://localhost:5000`

Logs are interleaved with colored prefixes. Press `Ctrl+C` once to stop both.

### Other scripts

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Run **web + api** together (default)                |
| `pnpm dev:solo`  | Run only the Next.js web app                        |
| `pnpm dev:web`   | Same as `dev:solo` (used internally by `dev`)       |
| `pnpm dev:api`   | Run only the API (proxies to `../smitparekh-api`)   |
| `pnpm setup`     | `pnpm install` in both repos                        |
| `pnpm build`     | Production build of the Next.js app                 |
| `pnpm lint`      | ESLint                                              |

### Requirements

- Node.js **≥ 22** (the API uses `node --watch`)
- pnpm **≥ 9**

---

## Deployment

The web app deploys to Vercel; the API deploys separately (see `smitparekh-api/vercel.json`). Production builds use `pnpm build` / `pnpm start` in each repo independently - the combined `dev` script is local-only.

