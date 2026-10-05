import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { assetUrl } from "../../lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: blog, loading, error } = useFetch(`/blogs/slug/${slug}`);

  if (loading) return <p className="px-5 pt-40 text-center text-white/50">Loading…</p>;
  if (error || !blog)
    return (
      <div className="px-5 pt-40 text-center">
        <p className="text-white/60">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-violet-300">← Back to blog</Link>
      </div>
    );

  const date = new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Link to="/blog" className="text-sm text-violet-300 transition hover:text-white">← All posts</Link>
      <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">{blog.title}</h1>
      <p className="mt-3 text-sm text-white/45">{date}</p>
      {blog.coverImage && (
        <img src={assetUrl(blog.coverImage)} alt={blog.title} className="mt-8 w-full rounded-3xl object-cover" />
      )}
      <div className="mt-10 whitespace-pre-line text-lg leading-relaxed text-white/75">{blog.content}</div>
    </article>
  );
}