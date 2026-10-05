import useFetch from "../../hooks/useFetch";
import BlogCard from "../../components/public/BlogCard";

export default function BlogList() {
  const { data: blogs, loading } = useFetch("/blogs?published=true");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Blog</p>
      <h1 className="mb-12 mt-2 text-4xl font-extrabold">Thoughts & <span className="gradient-text">tutorials</span></h1>

      {loading ? (
        <p className="text-white/50">Loading…</p>
      ) : !blogs?.length ? (
        <p className="text-white/50">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} />
          ))}
        </div>
      )}
    </div>
  );
}