# feat(web): security + error handling refactor, image optimization and fonts toggle

## Summary
- Improve security and config hygiene
- Unify API error shape with traceId and rate-limit hints
- Optimize images with next/image + configurable domains
- Make Google Fonts usage configurable for offline builds

## Key Changes
### Secrets and env
- Replace AUTH_SECRET -> NEXTAUTH_SECRET across docs/scripts
- Remove committed .env.local; keep .env.example only
- Add IMAGE_DOMAINS env to control next/image external domains

### API error handling
- Add traceId to error responses (404/429/500) in:
  - `/api/tweets/[username]`
  - `/api/accounts`, `/api/accounts/[id]`
  - `/api/twitter/info`
- Return `Retry-After: 60` for 429 (rate limit) responses

### Frontend error UX
- ErrorState now parses and displays:
  - traceId with a one-click “Copy traceId”
  - Retry countdown using Retry-After (button disabled until countdown ends)

### Image optimization
- Replace `<img>` with `next/image` for avatars in:
  - `components/AccountManager.tsx`
  - `components/Dashboard.tsx`
- `next/image` domains configurable by env: `IMAGE_DOMAINS` (default `pbs.twimg.com,via.placeholder.com`)

### Fonts and offline build
- Provide toggle via `ENABLE_GOOGLE_FONTS` (default off)
- Webpack alias `@/lib/fonts` → google/offline variants:
  - `src/lib/fonts.google.ts` uses `next/font/google` (Geist, Geist_Mono)
  - `src/lib/fonts.offline.ts` provides CSS var placeholders for offline build stability

### Next.js route typing and lint
- Fix App Router handler param typing to avoid Next’s type checker conflicts
- Keep lint clean; suppress only necessary `any` with file-level pragma for route context

### Structural (Git)
- `apps/web` was a gitlink before; converted to normal directory under the root repo for unified versioning
- All web app files are now tracked within this repository

## Security Impact
- No secrets in source. `.env` files ignored; example provided only
- `NEXTAUTH_SECRET` required for auth; please update environment configs
- `traceId` added for error responses (no sensitive info, only UUID for log correlation)

## Breaking Changes
- If any automation relied on `apps/web` as a submodule, update the workflow to treat it as a normal directory

## Environment Variables
### Required
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Optional
- `IMAGE_DOMAINS=pbs.twimg.com,via.placeholder.com`
- `ENABLE_GOOGLE_FONTS=true` (enable remote Google Fonts if network allows)
- `TWITTER_BEARER_TOKEN` / `TWITTER_API_KEY` / `TWITTER_API_SECRET` (for real Twitter API; otherwise mock data is used)

## How To Test Locally
```bash
cd apps/web
npm install
cp .env.example .env.local  # set NEXTAUTH_SECRET, NEXTAUTH_URL=http://localhost:3000; MOCK_DATA_ENABLED=true
npm run lint
npm run type-check
npm run build
npm run dev
# Visit http://localhost:3000
# Login: admin@twittermonitor.com / admin123
```
- Verify dashboard loads with mock data
- API endpoints: `/api/tweets/[username]`, `/api/accounts` (+ POST/DELETE/PUT), `/api/twitter/info`
- Rate-limit paths should show retry button disabled with countdown and a visible `traceId`

## Deployment Notes
- Set environment variables in Vercel (or your platform):
  - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
  - Optional: `IMAGE_DOMAINS`, `ENABLE_GOOGLE_FONTS`, Twitter API keys
- If your CI/CD has restricted network, keep `ENABLE_GOOGLE_FONTS` unset/false to avoid build-time font fetches
- After deploy, validate auth, dashboard rendering, and error displays with traceId

## Checklist
- [x] No secrets committed
- [x] Lint passes
- [x] Build passes
- [x] Error responses include traceId; Retry-After added for 429
- [x] next/image configured with env-based domains
- [x] `apps/web` tracked as normal directory

