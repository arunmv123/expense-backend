const { body, param } = require("express-validator");

exports.expenseValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date").isDate().withMessage("Invalid date format"),
];

exports.expenseIdValidation = [
  param("id").isMongoId().withMessage("Invalid expense ID"),
];
