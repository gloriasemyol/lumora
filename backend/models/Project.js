import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    image: String,
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);