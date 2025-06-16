import express from "express";
import { login, signup, validate } from "./auth.controller.js";
import authLimiter from "../../middleware/authLimiter.js";
import tokenValidator from "../../middleware/tokenValidator.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/validate", authLimiter, tokenValidator, validate);

export default router;

// Todos
// Adding refresh tokens
// Add password reset functionality
// Add account deletion endpoint
// Add user name and update user profile
// enable public (sharing notes like blog)
// add updated at to both model
