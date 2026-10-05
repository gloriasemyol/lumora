import { Link } from "react-router-dom";
import Section from "./Section";
import BlogCard from "./BlogCard";

export default function BlogPreview({ blogs }) {
  if (!blogs?.length) return null;

  return (
    <Section id="blog" eyebrow="Blog" title="Latest writing">
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.slice(0, 3).map((b) => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
      <Link to="/blog" className="mt-8 inline-block text-sm font-semibold text-violet-300 transition hover:text-white">
        Read all posts →
      </Link>
    </Section>
  );
}