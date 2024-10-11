const Expense = require('../models/Expense');

class ExpenseService {
  async createExpense(userId, expenseData) {
    const expense = await Expense.create({ ...expenseData, user: userId });
    return expense;
  }

  async getExpenses(userId) {
    const expenses = await Expense.find({ user: userId });
    return expenses;
  }

  async updateExpense(id, userId, expenseData) {
    const expense = await Expense.findOneAndUpdate({ _id: id, user: userId }, expenseData, { new: true });
    if (!expense) throw new Error('Expense not found');
    return expense;
  }

  async deleteExpense(id, userId) {
    const expense = await Expense.findOneAndDelete({ _id: id, user: userId });
    if (!expense) throw new Error('Expense not found');
  }
}

module.exports = new ExpenseService();
