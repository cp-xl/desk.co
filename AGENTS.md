# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Project Documentation

`docs/` is the source of truth for project history. Read it before making changes.

- `docs/README.md`: index, conventions, and a brief map of how the project fits together.
- `docs/CHANGELOG.md`: every change set, newest first. Start here.
- `docs/changelog/`: one detailed entry per change set (`YYYY-MM-DD-short-slug.md`).
- `docs/decisions.md`: standing decisions and what was ruled out. **Check before reversing
  anything** — several choices in this codebase look arbitrary until you know the reasoning.
- `docs/product-image-briefs.md`: per-product source facts for generating product imagery.

`brand/` is the source of truth for brand identity. Consult it before changing anything
visual or writing any user-facing copy.

- `brand/README.md`: index and the short version of what Descko is.
- `brand/logo.md`: the wordmark, its three files, clear space, minimum size, misuse.
- `brand/colour.md`: the palette and what each colour is allowed to do.
- `brand/typography.md`: the three faces, and the `font-family` rule that keeps them apart.
- `brand/voice.md`: how Descko writes. **Read this before writing any copy** — no hype, no
  contractions, no em dashes, no exclamation marks.

Exported artwork lives in `public/brand/` and is **generated** — never edit it by hand.

After completing a change set, add an entry to `docs/CHANGELOG.md` and a matching file in
`docs/changelog/`, and record any new standing decision in `docs/decisions.md`.

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `src/lib/`: shared logic — `wixProducts.js` (Wix to design-layer mapping), `search.js`,
  `archetypes.js` (gift quiz and guides), `collections.js`.
- `base44/functions/`: backend functions; all Wix catalogue and checkout traffic goes through here.
- `tools/brand/`: brand asset generator; not wired into `package.json` by design.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.
