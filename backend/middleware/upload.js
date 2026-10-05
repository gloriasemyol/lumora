import multer from "multer";

const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(Object.assign(new Error("Only JPG, PNG, WEBP or GIF images allowed"), { status: 400 }));
};

export default multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});