# Playwright POM — updated root configuration

Extract the ZIP **contents** directly into `D:\app\playwright` (merge the `tests` folder). Do not put the contents inside another `tests` folder.

The project uses TypeScript aliases `@pages/*`, `@utils/*`, and `@data/*`. Root `tsconfig.json` and `playwright.config.ts` must be siblings. Remove any old `tests/tsconfig.json`.

In PowerShell, from `D:\app\playwright`:

```powershell
npm install
npx playwright install chromium
Test-Path .\tsconfig.json
npx tsc --noEmit
npx playwright test --list
npx playwright test
```

The Excel file is `tests/data/testdata.xlsx`; update credentials for your local backend. The UI is expected at http://localhost:5173 and API at http://localhost:8000.

If you keep your existing package.json instead of replacing it, run `npm install -D @playwright/test @types/node typescript` and `npm install xlsx`.
