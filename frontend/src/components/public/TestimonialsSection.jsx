import Section from "./Section";
import { assetUrl } from "../../lib/api";

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;

  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Kind words">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t._id} className="glass rounded-3xl p-7">
            <blockquote className="leading-relaxed text-white/70">“{t.message}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              {t.avatar ? (
                <img src={assetUrl(t.avatar)} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/20 font-bold text-violet-200">
                  {t.name[0]}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/45">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}