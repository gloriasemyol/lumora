import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startDate: String,
    endDate: String,
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);