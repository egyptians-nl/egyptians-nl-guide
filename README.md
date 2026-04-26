# Egyptians NL Guide

Egyptians NL Guide is a bilingual static wiki for Egyptians living in the Netherlands. It is built with MkDocs and Material for MkDocs, and publishes to GitHub Pages at `https://egyptians-nl.github.io/egyptians-nl-guide/`.

The goal is to provide a practical community guide covering settling in, housing, healthcare, residence permits, work, and common questions. The content is available in English and Arabic. It is a community resource and should not replace official legal, immigration, tax, or medical guidance.

## Local setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
mkdocs build
```

Or use the project helper commands:

```bash
npm run setup
npm run serve
npm run build
```

## Run locally

- `mkdocs serve` starts a local development server, usually at `http://127.0.0.1:8000/`.
- `mkdocs build` generates the static site into the `site/` directory.
- `npm run serve` runs the same local development server through the commented Node task runner.
- `npm run build` runs `mkdocs build --strict`.
- `npm run check` is a strict verification build.
- `npm run clean` removes the generated `site/` directory.

## Content structure

The documentation lives under `docs/` and uses suffix-based language files:

- English pages end with `.en.md`
- Arabic pages end with `.ar.md`

Examples:

- `docs/index.en.md`
- `docs/index.ar.md`
- `docs/housing/index.en.md`
- `docs/housing/index.ar.md`

To add a new bilingual page:

1. Create the English file as `page-name.en.md`
2. Create the Arabic file as `page-name.ar.md`
3. Add the page to `nav` in `mkdocs.yml`
4. Keep both versions aligned in scope, while writing each naturally for its audience

## Deployment

Deployment is handled by GitHub Actions through `.github/workflows/deploy.yml`.

On every push to `main`, the workflow:

1. Checks out the repository
2. Sets up Python
3. Installs dependencies from `requirements.txt`
4. Builds the site with MkDocs
5. Uploads the generated site as a GitHub Pages artifact
6. Deploys it to GitHub Pages

## Contribution notes

- Keep the structure simple and documentation-focused
- Verify sensitive topics against official Dutch sources
- For immigration topics, check IND
- For tax topics, check Belastingdienst
- For healthcare topics, check official Dutch healthcare sources or your insurer
- If you update one language, review whether the paired language page should also be updated

## License

This project is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). See [LICENSE](LICENSE).
