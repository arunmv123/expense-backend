const express = require("express");
const ExpenseController = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");
const { expenseSchema } = require("../validations/expenseValidation");
const { validate } = require("../middlewares/validate");

const router = express.Router();

router.use(authMiddleware);
router.get("/", ExpenseController.getExpenses);
router.post("/", validate(expenseSchema), ExpenseController.createExpense);
router.put("/:id", validate(expenseSchema), ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;
