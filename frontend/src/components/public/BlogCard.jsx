import { Link } from "react-router-dom";
import { assetUrl } from "../../lib/api";

export default function BlogCard({ blog }) {
  const date = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="glass group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-2 hover:border-violet-400/40"
    >
      <div className="aspect-video overflow-hidden bg-[#14141f]">
        {blog.coverImage && (
          <img src={assetUrl(blog.coverImage)} alt={blog.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-medium text-violet-300">{date}</p>
        <h3 className="mt-2 text-lg font-bold">{blog.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{blog.excerpt}</p>
      </div>
    </Link>
  );
}