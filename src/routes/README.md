# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
is a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

## Vercel Deployment

This project is configured to build for **Vercel** through Nitro.

### Deploy steps

1. Import the repository into Vercel.
2. Keep the default build command: `npm run build`.
3. Set the project root to `buddiez-holiday-hub` if Vercel is not already detecting it.
4. Deploy without adding a custom `vercel.json` file unless you need extra platform rules.

### Environment variables

Set these in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL` or `VITE_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_PUBLISHABLE_KEY`
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_TEAM_EMAIL`
- `BREVO_SENDER_NAME` (optional)
- `BREVO_COMPANY_NAME` (optional)

### Notes

- The app uses the Vercel Nitro preset in `vite.config.ts`.
- `src/start.ts` already includes CSRF protection for server functions.
- After deployment, verify the booking form and email workflow once from the live Vercel URL.
