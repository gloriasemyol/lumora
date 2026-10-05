import Section from "./Section";

export default function ExperienceSection({ experience }) {
  if (!experience?.length) return null;

  return (
    <Section id="experience" eyebrow="Experience" title="My journey so far">
      <div className="relative ml-3 border-l border-white/10 pl-8">
        {experience.map((e) => (
          <div key={e._id} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-[#0a0a12] bg-violet-400" />
            <p className="text-sm font-medium text-violet-300">
              {e.startDate} – {e.endDate || "Present"}
            </p>
            <h3 className="mt-1 text-xl font-bold">{e.role}</h3>
            <p className="text-white/50">{e.company}</p>
            {e.description && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/60">{e.description}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}