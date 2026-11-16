import { Router } from "express";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/require-auth.js";

const authService = new AuthService();
const authController = new AuthController(authService);

const router = Router();

router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.me);
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
