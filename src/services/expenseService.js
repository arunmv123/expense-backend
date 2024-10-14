const Expense = require("../models/expenseModel");

class ExpenseService {
  async getAllExpenses(userId) {
    return await Expense.find({ user: userId });
  }

  async createExpense(expenseData) {
    const expense = new Expense(expenseData);
    return await expense.save();
  }

  async updateExpense(expenseId, updateData) {
    return await Expense.findByIdAndUpdate(expenseId, updateData, {
      new: true,
    });
  }

  async deleteExpense(expenseId) {
    return await Expense.findByIdAndDelete(expenseId);
  }
}

module.exports = new ExpenseService();
