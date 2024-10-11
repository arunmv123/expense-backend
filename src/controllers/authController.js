const AuthService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token } = await AuthService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
