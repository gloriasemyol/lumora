import express from "express";
import { v2 as cloudinary } from "cloudinary";
import upload from "../middleware/upload.js";
import Media from "../models/Media.js";
import { protect } from "../middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "lumora" }, (err, result) =>
      err ? reject(err) : resolve(result)
    );
    stream.end(buffer);
  });

const router = express.Router();

router.post("/image", protect, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  const result = await uploadToCloudinary(req.file.buffer);
  const media = await Media.create({
    filename: result.public_id,
    url: result.secure_url,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
  res.status(201).json(media);
});

export default router;