import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    bio: String,
    avatar: String,
    resumeUrl: String,
    email: String,
    location: String,
    github: String,
    linkedin: String,
    twitter: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);