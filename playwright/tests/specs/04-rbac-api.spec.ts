import { test, expect, APIRequestContext } from "@playwright/test";
import { Role } from "@data/users";
import { getUser } from "@utils/excelReader";

const apiURL = process.env.API_URL || "http://localhost:8000";

async function authenticate(request: APIRequestContext, role: Role): Promise<void> {
  const response = await request.post(`${apiURL}/auth/login`, {
    data: {
      email: getUser(role).email,
      password: getUser(role).password
    }
  });
  expect(response.status()).toBe(200);
}

test("TC20 - anonymous admin API returns 401", async ({ request }) => {
  const response = await request.get(`${apiURL}/admin/users`);
  expect(response.status()).toBe(401);
});

for (const role of ["student", "trainer"] as const) {
  test(`TC21 - ${role} admin API returns 403`, async ({ request }) => {
    await authenticate(request, role);
    const response = await request.get(`${apiURL}/admin/users`);
    expect(response.status()).toBe(403);
  });

}

for (const role of ["trainer", "admin"] as const) {
  test(`TC22 - ${role} MCQ submission returns 403`, async ({ request }) => {
    await authenticate(request, role);
    const response = await request.post(`${apiURL}/mcq/submit`, {
      data: { course_id: 1, answers: [] }
    });
    expect(response.status()).toBe(403);
  });
}

test("TC23 - admin API returns user list", async ({ request }) => {
  await authenticate(request, "admin");
  const response = await request.get(`${apiURL}/admin/users`);
  expect(response.status()).toBe(200);
  const usersList = await response.json();
  expect(Array.isArray(usersList)).toBe(true);
});

test("TC24 - student MCQ submission passes role authorization", async ({ request }) => {
  await authenticate(request, "student");
  const response = await request.post(`${apiURL}/mcq/submit`, {
    data: { course_id: -1, answers: [] }
  });
  expect(response.status()).toBe(404);
});

test("TC25 - anonymous course API returns 401", async ({ request }) => {
  const response = await request.get(`${apiURL}/courses`);
  expect(response.status()).toBe(401);
});
