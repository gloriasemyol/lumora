import "dotenv/config";
import dns from "dns";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

// Force Node.js to use Google public DNS to bypass Windows/ISP SRV lookup blocks globally
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lumora API is alive 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
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
  if (status === 500) console.error(err);
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});