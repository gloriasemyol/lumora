import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    excerpt: String,
    content: String,
    coverImage: String,
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-make the URL slug from the title ("My First Post" -> "my-first-post")
blogSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

export default mongoose.model("Blog", blogSchema);