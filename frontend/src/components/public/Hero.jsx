import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { assetUrl } from "../../lib/api";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero({ about }) {
  const name = about?.name || "Your Name";
  const title = about?.title || "Full Stack Developer";
  const bio = about?.bio || "I build fast, beautiful web apps from the database to the last pixel.";
  const short = bio.length > 220 ? bio.slice(0, 220) + "…" : bio;

  const socials = [
    ["GitHub", about?.github],
    ["LinkedIn", about?.linkedin],
    ["Twitter", about?.twitter],
  ].filter(([, url]) => url);

  return (
    <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-16 pt-32 md:grid-cols-2">
      <div>
        <motion.span
          {...fade(0)}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to work
        </motion.span>

        <motion.h1 {...fade(0.1)} className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
          Hi, I'm <span className="gradient-text">{name}</span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-3 text-xl font-semibold text-white/80">
          {title}
        </motion.p>

        <motion.p {...fade(0.3)} className="mt-5 max-w-lg leading-relaxed text-white/55">
          {short}
        </motion.p>

        <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white">
            View my work <ArrowUpRight size={16} />
          </a>
          <a href="#contact" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition hover:bg-white/10">
            Get in touch
          </a>
          {about?.resumeUrl && (
            <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition hover:bg-white/10">
              <Download size={16} /> Resume
            </a>
          )}
        </motion.div>

        {socials.length > 0 && (
          <motion.div {...fade(0.5)} className="mt-8 flex gap-6 text-sm text-white/50">
            {socials.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {label} ↗
              </a>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div {...fade(0.3)} className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 opacity-60 blur-2xl" />
          {about?.avatar ? (
            <img src={assetUrl(about.avatar)} alt={name} className="relative h-72 w-72 rounded-full border-4 border-white/10 object-cover md:h-96 md:w-96" />
          ) : (
            <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-4 border-white/10 bg-[#14141f] text-8xl font-extrabold md:h-96 md:w-96">
              <span className="gradient-text">{name[0]}</span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}