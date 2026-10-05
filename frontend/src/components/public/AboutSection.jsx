import Section from "./Section";

export default function AboutSection({ about }) {
  if (!about?.bio) return null;

  return (
    <Section id="about" eyebrow="About me" title="A little about me">
      <div className="glass rounded-3xl p-8 md:p-10">
        <p className="whitespace-pre-line leading-relaxed text-white/70">{about.bio}</p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/50">
          {about.location && <span>📍 {about.location}</span>}
          {about.email && (
            <a href={`mailto:${about.email}`} className="transition hover:text-white">
              ✉️ {about.email}
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}