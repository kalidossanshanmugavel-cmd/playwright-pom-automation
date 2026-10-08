# Recitation2 Playwright POM — Excel-driven RBAC

Move this `tests` folder to `D:/app/playwright/tests/recitation2` or merge its contents into your current `tests` directory. The imports are relative inside this folder. Set `testDir` to the specs directory in `playwright.config.ts` (e.g. `./tests/specs` when merged, or `./tests/recitation2/specs` when nested).

## Install (from the Playwright project root)

```bash
npm install -D @playwright/test
npm install xlsx
npx playwright install chromium
```

## Excel credentials

Edit `tests/data/testdata.xlsx` → **Users** sheet. Headers: `role`, `email`, `password`, `dashboard`. Supported roles: `admin`, `trainer`, `student`. The reader also accepts `username` instead of `email`. These demo credentials must match the accounts actually seeded in your backend.

`tests/utils/excelReader.ts` reads the workbook at runtime; `loginAs()` and the API RBAC tests use the same credentials. Never commit real passwords to source control.

## Configure and run

Use `baseURL: "http://localhost:5173"` in the Playwright config. Backend defaults to `http://localhost:8000` (override with `API_URL`). Start both services, then run:

```bash
npx playwright test --list
npx playwright test
npx playwright test --ui
```

Login redirects expect `/admin/dashboard`, `/trainer/dashboard`, and `/student/dashboard`. Specs cover login, RBAC, courses, course details, registration, MCQ, practice, progress, direct URLs and API RBAC. Tests have not been executed against running services in this environment.

## Alias imports (no ../ paths)

All internal imports now use `@pages/*`, `@utils/*`, or `@data/*`.
When copying this folder to `D:/app/playwright/tests`, merge these entries
into the Playwright project's ROOT `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["tests/pages/*"],
      "@utils/*": ["tests/utils/*"],
      "@data/*": ["tests/data/*"]
    },
    "types": ["node", "@playwright/test"]
  }
}
```

Install dependencies: `npm install xlsx` and `npm install -D @types/node`.
Do not replace other existing tsconfig settings. If you use nested tests/recitation2,
adjust aliases to that nested path.

Validation: TC22 checks trainer/admin only; student MCQ authorization is checked separately in TC24. Tests require a running backend and frontend and valid seeded Excel credentials.
