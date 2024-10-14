const express = require("express");
const {
  expenseValidation,
  expenseIdValidation,
} = require("../validations/expenseValidation");
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", expenseController.getAllExpenses);
router.post("/", expenseValidation, expenseController.createExpense);
router.put(
  "/:id",
  expenseIdValidation,
  expenseValidation,
  expenseController.updateExpense
);
router.delete("/:id", expenseIdValidation, expenseController.deleteExpense);

module.exports = router;
