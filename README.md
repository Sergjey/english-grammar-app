# Murphy Drills

Mobile-first English grammar practice web app with 14 drill types (pattern, substitution, transformation, speaking, shadowing, and more). Organised into 10 pilot units inspired by common *Essential Grammar in Use* topics.

**Not affiliated with Cambridge University Press or Raymond Murphy.** Exercises are original; use your own copy of the book for reference.

## Local setup

Requires [Node.js 20](https://nodejs.org/) (see `.nvmrc`).

```bash
nvm use          # or: nvm install
npm install
npm run generate-units
npm run dev
```

Open http://localhost:5173

Dependencies install only into `./node_modules` in this folder — nothing global except nvm/fnm.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build → `dist/` |
| `npm run generate-units` | Regenerate unit JSON (10 × 14 × 50 exercises) |
| `npm run validate-content` | Validate content schema |

## GitHub Pages

1. Push this repo to GitHub as `english-grammar-app` (or change `base` in `vite.config.ts`).
2. **Settings → Pages → Build and deployment → GitHub Actions**.
3. Push to `main` — workflow deploys automatically.

Live URL: `https://<username>.github.io/english-grammar-app/`

## PDF in workspace

The Murphy PDF is listed in `.gitignore` and should **not** be committed to a public repository.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router, Zustand
- Web Speech API for listening drills
