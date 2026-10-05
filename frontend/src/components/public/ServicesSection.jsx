import { Sparkles } from "lucide-react";
import Section from "./Section";

export default function ServicesSection({ services }) {
  if (!services?.length) return null;

  return (
    <Section id="services" eyebrow="Services" title="How I can help">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div key={s._id} className="glass rounded-3xl p-7 transition hover:-translate-y-1 hover:border-violet-400/40">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}