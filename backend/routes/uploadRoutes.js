import express from "express";
import upload from "../middleware/upload.js";
import Media from "../models/Media.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/image", protect, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  const media = await Media.create({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
  res.status(201).json(media);
});

export default router;