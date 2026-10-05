import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    level: { type: Number, default: 80, min: 0, max: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);