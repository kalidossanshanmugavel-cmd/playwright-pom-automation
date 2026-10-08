# Playwright Page Object Model tests

The specs use separate Page Object classes, shared login helper, and role data.

## Prerequisites
Start FastAPI on `http://localhost:8000` and Vite on `http://localhost:5173`.
The database must have the seeded demo accounts. Run commands from `app/frontend`.

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright test --ui
npx playwright show-report
```

Override endpoints with `BASE_URL` and `API_URL`, and seeded account credentials with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `TRAINER_EMAIL`, `TRAINER_PASSWORD`, `STUDENT_EMAIL`, `STUDENT_PASSWORD`.

`04-rbac-api.spec.ts` uses Playwright APIRequestContext, which retains the HTTP-only session cookie returned by `/auth/login`. It verifies 401 vs 403 and does not require reading JWTs.

Tests depend on seeded courses and demo users; they are intended for a development/test database, not production. Some TC IDs are shared by parametrized role variants; Playwright treats each role as a separate test.

## Full page coverage additions

- 05-register.spec.ts: registration form, login navigation, new student account
- 06-course-details.spec.ts: lesson accordion and assessment link, all roles
- 07-mcq.spec.ts: MCQ loading, navigation, answer submission
- 08-practice.spec.ts: practice accordion, all roles
- 09-progress.spec.ts: progress table, all roles
- 10-direct-url-access.spec.ts: guest route guards and cross-role dashboard denial

Each page has a dedicated Page Object under tests/pages. Tests assume the seeded courses and questions exist and both services are running. Registration and MCQ submission write test data to the database. Test execution against live services is not verified in this environment.
