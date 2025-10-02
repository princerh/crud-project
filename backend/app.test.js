const request = require('supertest');
const app = require('./server'); // import the app we exported

describe("Employee API", () => {
  it("GET /api/employees should return 200 and an array", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/employees should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "Test User", position: "Intern", salary: 30000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test User");
  });

  it("PUT /api/employees/:id should update employee", async () => {
    const res = await request(app)
      .put("/api/employees/1")
      .send({ position: "Senior Engineer" });
    expect(res.statusCode).toBe(200);
    expect(res.body.position).toBe("Senior Engineer");
  });

  it("DELETE /api/employees/:id should delete employee", async () => {
    const res = await request(app).delete("/api/employees/2");
    expect(res.statusCode).toBe(204);
  });
});
