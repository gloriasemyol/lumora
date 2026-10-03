import "dotenv/config";
import dns from "dns";
import mongoose from "mongoose";
import User from "./models/User.js";

// Force Node.js to use Google public DNS to bypass Windows/ISP SRV lookup blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists:", email);
  } else {
    await User.create({ name: "Admin", email, password: process.env.ADMIN_PASSWORD });
    console.log("✅ Admin created:", email);
  }
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});