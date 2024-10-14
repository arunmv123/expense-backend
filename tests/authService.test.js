const AuthService = require("../src/services/authService");
const User = require("../src/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/userModel"); // Mock the User model
jest.mock("bcryptjs"); // Mock bcrypt
jest.mock("jsonwebtoken"); // Mock jwt

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("register", () => {
    it("should register a new user and return user data", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const hashedPassword = "hashed_password";

      // Mocking bcrypt.hash
      bcrypt.hash.mockResolvedValue(hashedPassword);
      // Mocking User.save method
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true),
      }));

      const result = await AuthService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User).toHaveBeenCalledWith({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });
      expect(result).toEqual({
        username: userData.username,
        email: userData.email,
      });
    });
  });

  describe("login", () => {
    it("should login user and return a JWT token", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = {
        _id: "user_id",
        password: "hashed_password",
      };

      // Mocking User.findOne
      User.findOne.mockResolvedValue(user);
      // Mocking bcrypt.compare
      bcrypt.compare.mockResolvedValue(true);
      // Mocking jwt.sign
      jwt.sign.mockReturnValue("jwt_token");

      const token = await AuthService.login(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      expect(token).toBe("jwt_token");
    });

    it("should throw an error if credentials are invalid", async () => {
      const email = "test@example.com";
      const password = "wrong_password";
      const user = {
        _id: "user_id",
        password: "hashed_password",
      };

      // Mocking User.findOne
      User.findOne.mockResolvedValue(user);
      // Mocking bcrypt.compare to return false
      bcrypt.compare.mockResolvedValue(false);

      await expect(AuthService.login(email, password)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });
});
