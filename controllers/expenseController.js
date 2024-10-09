const Expense = require("../models/expenseModel");
const { validationResult } = require("express-validator");

// Get all expenses for logged-in user
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

// Create a new expense
exports.createExpense = async (req, res, next) => {
  const { title, amount, category, date } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const expense = new Expense({
      user: req.user._id,
      title,
      amount,
      category,
      date,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

// Update an expense
exports.updateExpense = async (req, res, next) => {
  const { title, amount, category, date } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    next(err);
  }
};

// Delete an expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Expense.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "Expense removed" });
  } catch (err) {
    next(err);
  }
};
