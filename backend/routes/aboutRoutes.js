import express from "express";
import About from "../models/About.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const about = await About.findOne();
  res.json(about || {});
});

router.put("/", protect, async (req, res) => {
  const about = await About.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.json(about);
});

export default router;