const ExpenseService = require("../services/expenseService");

class ExpenseController {
  async createExpense(req, res) {
    try {
      const expense = await ExpenseService.createExpense(req.user.id, req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getExpenses(req, res) {
    try {
      const expenses = await ExpenseService.getExpenses(req.user.id);
      res.status(200).json(expenses);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const expense = await ExpenseService.updateExpense(
        req.params.id,
        req.user.id,
        req.body
      );
      res.status(200).json(expense);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      await ExpenseService.deleteExpense(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new ExpenseController();
