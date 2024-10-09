const express = require("express");
const { register, login } = require("../controllers/authController"); // Ensure this path is correct
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

module.exports = router;
