test("get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_At).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_At).toISOString();
  expect(responseBody.updated_At).toEqual(parsedUpdateAt);
});
