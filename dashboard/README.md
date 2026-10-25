# Actions Status Dashboard

A React dashboard for monitoring GitHub Actions, built with TypeScript and Vite.

## Requirements

Use Node.js 24 LTS and npm. Python-based repository hooks use Python 3.15;
`.python-version` and `.pre-commit-config.yaml` declare that version.

TypeScript stays on 6.0.3 because the current `typescript-eslint` release supports
TypeScript versions below 6.1. Upgrade them together when that support changes.

## Development

Run these commands from the `dashboard` directory:

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npx prettier . --check
npm test
npm run build
```

CI runs the same checks and installs dependencies from `package-lock.json` with
`npm ci`. The production build is written to `dist`.

To preview the production build locally:

```sh
npm run build
npm run preview
```
