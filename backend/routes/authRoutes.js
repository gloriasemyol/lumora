import express from "express";
import { login, refresh, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", protect, me);

export default router;