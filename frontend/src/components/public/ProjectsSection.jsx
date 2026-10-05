import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { assetUrl } from "../../lib/api";

export default function ProjectsSection({ projects }) {
  if (!projects?.length) return null;

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p._id}
            className="glass group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-2 hover:border-violet-400/40"
          >
            <div className="aspect-video overflow-hidden bg-[#14141f]">
              {p.image ? (
                <img 
                  src={assetUrl(p.image)} 
                  alt={p.title} 
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl font-extrabold text-white/10">{p.title[0]}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.techStack || []).map((t) => (
                  <span key={t} className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-5 text-sm font-semibold">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-300 transition hover:text-white">
                    Live demo <ArrowUpRight size={14} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/50 transition hover:text-white">
                    Code <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}