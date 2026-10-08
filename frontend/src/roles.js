export const homeFor = (role) => `/${["admin", "trainer", "student"].includes(role) ? role : "student"}/dashboard`;
