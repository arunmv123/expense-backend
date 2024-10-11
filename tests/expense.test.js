const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Expense = require("../src/models/Expense");

let token;
let userId;

before(async () => {
  // Create a user for testing
  const user = await User.create({
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  });

  userId = user._id;

  // Login to get the token
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  });

  token = res.body.token;
});

afterEach(async () => {
  // Cleanup: remove expenses after each test
  await Expense.deleteMany({});
});

describe("Expense API", () => {
  describe("POST /api/expenses", () => {
    it("should create a new expense", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Groceries",
          amount: 50,
          category: "Food",
          date: "2024-10-10",
        });

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property("title", "Groceries");
      expect(res.body).to.have.property("amount", 50);
      expect(res.body).to.have.property("category", "Food");
    });

    it("should return 400 for invalid input", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "",
          amount: -10, // Invalid amount
          category: "Food",
          date: "2024-10-10",
        });

      expect(res.statusCode).to.equal(400);
    });
  });

  describe("GET /api/expenses", () => {
    it("should return an array of expenses", async () => {
      await Expense.create({
        title: "Groceries",
        amount: 50,
        category: "Food",
        date: "2024-10-10",
        user: userId,
      });

      const res = await request(app)
        .get("/api/expenses")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("title", "Groceries");
    });
  });

  describe("PUT /api/expenses/:id", () => {
    let expenseId;

    beforeEach(async () => {
      const expense = await Expense.create({
        title: "Groceries",
        amount: 50,
        category: "Food",
        date: "2024-10-10",
        user: userId,
      });
      expenseId = expense._id;
    });

    it("should update an existing expense", async () => {
      const res = await request(app)
        .put(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Groceries",
          amount: 60,
          category: "Food",
          date: "2024-10-10",
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("title", "Updated Groceries");
      expect(res.body).to.have.property("amount", 60);
    });

    it("should return 404 for expense not found", async () => {
      const invalidId = "invalidid";
      const res = await request(app)
        .put(`/api/expenses/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Groceries",
          amount: 60,
          category: "Food",
          date: "2024-10-10",
        });

      expect(res.statusCode).to.equal(404);
    });
  });

  describe("DELETE /api/expenses/:id", () => {
    let expenseId;

    beforeEach(async () => {
      const expense = await Expense.create({
        title: "Groceries",
        amount: 50,
        category: "Food",
        date: "2024-10-10",
        user: userId,
      });
      expenseId = expense._id;
    });

    it("should delete an existing expense", async () => {
      const res = await request(app)
        .delete(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).to.equal(204);
    });

    it("should return 404 for expense not found", async () => {
      const invalidId = "invalidid";
      const res = await request(app)
        .delete(`/api/expenses/${invalidId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).to.equal(404);
    });
  });
});
