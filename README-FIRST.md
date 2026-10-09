# Repo setup, in order (10 minutes)

1. On GitHub create an empty repo `indvestate-site`. Clone it.
2. Unzip this handoff into the repo root (CLAUDE.md, docs/, .claude/).
3. Unzip INDVESTATE_Design_System.zip into `design-system/`.
4. Unzip the Claude Design export (Deesign_system_build_plan.zip) into `design/`
   (so `design/frames/`, `design/export/index.html`, `design/copy.md`,
   `design/motion-spec.md`, `design/new-components.md` exist).
5. Put property stills into `public/media/meerpet/` and `public/media/kompally/`
   when you have them (the build does not need them yet).
6. Commit: "handoff". Open Claude Code in the repo. Check `/skills` shows
   indvestate-design plus taste, ui-ux-pro-max, emil, gsap, react-bits.
7. Paste docs/PROMPTS.md "Phase 0" and go. One phase per session.
8. Fill every [CONFIRM] in docs/CONTENT.md as you get the facts; the production
   build refuses to ship while any remain.

## Vercel setup (environment variables)

Set every name below in Vercel → Project → Settings → Environment Variables for
Preview and Production, and in `.env.local` for development (`.env.example` lists
them). The production build fails while any `[CONFIRM]` remains in `docs/CONTENT.md`;
that is intended.

| Variable | Used by | Where it comes from |
|---|---|---|
| `RESEND_API_KEY` | `/api/lead`: one email per form to the desk | resend.com → API Keys. Verify the sending domain (indvestate.com) first. |
| `LEAD_FROM` | sender line on lead emails (optional) | A sender on the verified Resend domain. Defaults to `INDVESTATE desk <desk@indvestate.com>`. |
| `LEAD_TO` | where leads land (optional) | Defaults to `desk@indvestate.com`; the topic alias is cc'd. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `KV_URL` | lead rows, the reels list, rate limits | Vercel Marketplace → Upstash Redis (Vercel KV). Linking the store to the project sets these; the store's ".env.local" tab shows them for development. |
| `BLOB_READ_WRITE_TOKEN` | reel videos and posters uploaded from `/admin` | Vercel → Storage → Blob. Linking the store to the project sets it. |
| `ADMIN_PASSWORD` | `/admin` sign-in; the session cookie is signed from it | Choose a long passphrase. Changing it signs every session out. |

Without KV in development, lead rows and the reels list are kept in `.data/store.json`
(gitignored). Without KV or Blob in production, `/admin` writes answer 503 and the
home page's Watch rail renders from `src/content/reels.ts`.
