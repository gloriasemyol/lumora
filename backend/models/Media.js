import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    mimetype: String,
    size: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);