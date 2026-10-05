import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: String,
    message: { type: String, required: true },
    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);