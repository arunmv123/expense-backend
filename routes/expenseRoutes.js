const express = require("express");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getExpenses);
router.post(
  "/",
  authMiddleware,
  [
    check("title", "Title is required").not().isEmpty(),
    check("amount", "Amount is required and must be a number").isFloat(),
    check("category", "Category is required").not().isEmpty(),
    check("date", "Date must be in format YYYY-MM-DD").isISO8601(),
  ],
  createExpense
);

router.put(
  "/:id",
  authMiddleware,
  [
    check("title").optional().not().isEmpty(),
    check("amount").optional().isFloat(),
    check("category").optional().not().isEmpty(),
    check("date").optional().isISO8601(),
  ],
  updateExpense
);

router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;
