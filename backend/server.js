import "dotenv/config";
import dns from "dns";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Force Node.js to use Google public DNS to bypass Windows/ISP SRV lookup blocks globally
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.set("trust proxy", 1); // needed because Render sits behind a proxy
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// CLIENT_URL can hold several sites separated by commas (no trailing slash!)
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)),
  })
);

app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static("uploads"));

// Rate limits: stop spam and password guessing
const limiter = (minutes, limit, message) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

app.use("/api", limiter(15, 1000, "Too many requests, please slow down"));
app.use("/api/auth/login", limiter(15, 10, "Too many login attempts, try again in 15 minutes"));
app.use("/api/contact", limiter(60, 5, "Too many messages sent, please try again later"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lumora API is alive 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", contentRoutes);

// Error handler: must stay AFTER all routes
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Server error";
  if (err.name === "ValidationError" || err.name === "MulterError") status = 400;
  if (err.name === "CastError") {
    status = 404;
    message = "Not found";
  }
  if (err.code === 11000) {
    status = 400;
    message = "That value already exists";
  }
  if (status === 500) {
    console.error(err);
    message = "Server error";
  }
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});