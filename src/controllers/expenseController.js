const expenseService = require("../services/expenseService");

class ExpenseController {
  async getAllExpenses(req, res) {
    try {
      const expenses = await expenseService.getAllExpenses(req.user.id);
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createExpense(req, res) {
    try {
      const expenseData = { ...req.body, user: req.user.id };
      const expense = await expenseService.createExpense(expenseData);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const updatedExpense = await expenseService.updateExpense(
        req.params.id,
        req.body
      );
      if (!updatedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const deletedExpense = await expenseService.deleteExpense(req.params.id);
      if (!deletedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ExpenseController();
