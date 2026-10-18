# ChatPilot v2: Next.js → FastAPI → Supabase / Clerk

## Implemented
- Next.js server-only FastAPI bridge at `lib/fastapi.ts`
- Same-origin Next.js API routes: `/api/v2/chats`, `/api/v2/chats/[id]`, and `/api/v2/chats/[id]/messages`
- Clerk JWT templates exchanged **server-side** using `getToken({ template: "chatpilot-api" })`
- FastAPI checks JWT signature, issuer, expiry and `aud=chatpilot-api`; records filtered by authenticated owner.
- Supabase PostgreSQL migration script `backend/migrations/001_initial.sql` for isolated `cp_*` tables.

## Required setup (do not send secrets in chat)

### Clerk
1. Keep using the existing Clerk project.
2. Create a **JWT template** named exactly `chatpilot-api`.
3. Set audience (`aud`) to `chatpilot-api`, and ensure `sub` is the signed-in user's Clerk ID.
4. Set backend `CLERK_ISSUER` to the actual JWT issuer (`iss`) and `CLERK_JWT_AUDIENCE=chatpilot-api`.
5. Verify the template uses RS256 and published JWKS; the backend currently accepts RS256 only. If your Clerk setup issues a different token format, adapt verification explicitly rather than skipping validation.

### Supabase
1. Use existing Supabase project and its SQL editor; carefully review `backend/migrations/001_initial.sql` before running once.
2. FastAPI env `DATABASE_URL` must point to a PostgreSQL connection string formatted as `postgresql+psycopg://...`. Use SSL as required by Supabase.
3. Use backend-only credentials for DB connection. Never put DATABASE_URL in a `NEXT_PUBLIC_` value or expose Supabase's service role key.
4. The v2 tables are intentionally separate; existing Prisma chats are NOT automatically migrated.

### Local run
```bash
cd backend
python -m venv .venv
# Activate the virtual environment
pip install -r requirements.txt
# Create .env from .env.example and configure database + Clerk JWT.
uvicorn app.main:app --reload
```
In the Next.js root, add to your **local uncommitted** `.env.local`:
```
FASTAPI_INTERNAL_URL=http://127.0.0.1:8000
```
With Clerk variables already configured, run `npm run dev`. Authenticated requests to `/api/v2/chats` will proxy through Next.js to FastAPI. No browser-side cross-origin token handling is needed.

## Known limitations
- The existing dashboard, chat streaming and legacy `/api/chats` routes still use Next.js/Prisma. The new v2 routes are a **parallel integration**, not a switchover.
- A live authenticated end-to-end smoke test against your own Clerk and Supabase project is still required.
- The backend does not yet call the AI model, persist assistant replies, or ingest documents.
- Production hosting must give FastAPI private access to DATABASE_URL and enable HTTPS, rate limiting, timeout configuration, monitoring and backups.

## First smoke checks
1. Confirm `GET http://localhost:8000/health` returns `{"status":"ok"}`.
2. With no user session, `GET /api/v2/chats` should return 401.
3. With an authenticated user and configured JWT template, `POST /api/v2/chats` with `{"title":"Smoke test"}` should return 201.
4. User A's chat ID must return 404 to User B.
5. `POST /api/v2/chats/{id}/messages` with `{"role":"assistant","content":"fake"}` should return 422.
