const ExpenseService = require("../src/services/expenseService");
const Expense = require("../src/models/expenseModel");

jest.mock("../src/models/expenseModel");

describe("ExpenseService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllExpenses", () => {
    it("should return all expenses for the user", async () => {
      const userId = "user_id";
      const expenses = [
        {
          title: "Coffee",
          amount: 5,
          category: "Food",
          date: "2024-01-01",
          user: userId,
        },
        {
          title: "Lunch",
          amount: 10,
          category: "Food",
          date: "2024-01-02",
          user: userId,
        },
      ];

      // Mocking Expense.find
      Expense.find.mockResolvedValue(expenses);

      const result = await ExpenseService.getAllExpenses(userId);

      expect(Expense.find).toHaveBeenCalledWith({ user: userId });
      expect(result).toEqual(expenses);
    });
  });

  describe("createExpense", () => {
    it("should create a new expense and return it", async () => {
      const expenseData = {
        title: "Coffee",
        amount: 5,
        category: "Food",
        date: "2024-01-01",
        user: "user_id",
      };

      const savedExpense = { ...expenseData, _id: "expense_id" };

      // Mocking Expense.save
      Expense.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedExpense),
      }));

      const result = await ExpenseService.createExpense(expenseData);

      expect(Expense).toHaveBeenCalledWith(expenseData);
      expect(result).toEqual(savedExpense);
    });
  });

  describe("updateExpense", () => {
    it("should update an expense and return the updated expense", async () => {
      const expenseId = "expense_id";
      const updateData = {
        title: "Updated Coffee",
        amount: 6,
        category: "Beverages",
        date: "2024-01-02",
      };
      const updatedExpense = { ...updateData, _id: expenseId };

      // Mocking Expense.findByIdAndUpdate
      Expense.findByIdAndUpdate.mockResolvedValue(updatedExpense);

      const result = await ExpenseService.updateExpense(expenseId, updateData);

      expect(Expense.findByIdAndUpdate).toHaveBeenCalledWith(
        expenseId,
        updateData,
        {
          new: true,
        }
      );
      expect(result).toEqual(updatedExpense);
    });
  });

  describe("deleteExpense", () => {
    it("should delete an expense and return the deleted expense", async () => {
      const expenseId = "expense_id";
      const deletedExpense = { _id: expenseId, title: "Coffee", amount: 5 };

      // Mocking Expense.findByIdAndDelete
      Expense.findByIdAndDelete.mockResolvedValue(deletedExpense);

      const result = await ExpenseService.deleteExpense(expenseId);

      expect(Expense.findByIdAndDelete).toHaveBeenCalledWith(expenseId);
      expect(result).toEqual(deletedExpense);
    });
  });
});
