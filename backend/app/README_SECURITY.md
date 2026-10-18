# Security decisions for rebuild v0.1

- Clerk-issued JWTs must have a verified signature, issuer, audience, and expiration.
- No backend endpoint accepts an owner ID from the request body as proof of identity.
- Every chat read/write filters by `owner_clerk_id`.
- Clients can create user messages only; assistant messages will be persisted by trusted server-side generation later.
- CORS origins are an explicit allowlist, not `*`.
- PostgreSQL schema migration and app integration are pending.
- Public embeddable chat must use non-secret bot IDs plus domain allowlists, rate limits and tenant-scoped knowledge; do not use Clerk account IDs as customer-facing credentials.
- Tests use a local in-memory SQLite database and mocked identity, not live Clerk or Supabase credentials.
