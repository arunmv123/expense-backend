const express = require("express");
const AuthController = require("../controllers/authController");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");
const { validate } = require("../middlewares/validate");

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

module.exports = router;

