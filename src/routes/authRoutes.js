const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);

module.exports = router;
