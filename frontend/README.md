# Frontend of Agentok Studio

Next.js studio UI for building AG2 workflows visually.

## Getting started

1. Copy environment variables:

```bash
cp .env.sample .env.local
```

2. Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

3. Open [http://localhost:2855](http://localhost:2855).

The API must be running at `NEXT_PUBLIC_BACKEND_URL` (default `http://127.0.0.1:5004`). See the root [README.md](../README.md) for full stack setup.

> If you see frequent `useContext` server errors, remove `--turbo` from the `dev` script in `package.json`.

## Production deployment

Deploy as a standard Next.js app on Railway (or similar). The repo includes `railway.toml` to force the **Railpack** builder — Railway locks the dashboard to Dockerfile when one was previously detected, but config-as-code overrides that.

Set these environment variables **before the build**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BACKEND_URL`

In Railway, set the service **Root Directory** to `frontend`.

`NEXT_PUBLIC_*` values are embedded in the client bundle at build time. Changing them in your hosting dashboard after a deploy has no effect until you trigger a new build.

## Bundle analysis

```bash
ANALYZE=true pnpm build
```
