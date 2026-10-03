import "dotenv/config";
import dns from "dns";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Force Node.js to use Google public DNS to bypass Windows/ISP SRV lookup blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// Middleware: things that run on every request
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json()); // lets the server read JSON sent by the frontend
app.use("/uploads", express.static("uploads")); // makes uploaded images viewable

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lumora API is alive 🚀" });
});

const PORT = process.env.PORT || 5000;

// Connect to the database first, THEN start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});