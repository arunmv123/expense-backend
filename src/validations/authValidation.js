const { body } = require("express-validator");

exports.registerValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
