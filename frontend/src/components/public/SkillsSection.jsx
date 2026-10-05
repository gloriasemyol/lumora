import { motion } from "framer-motion";
import Section from "./Section";

export default function SkillsSection({ skills }) {
  if (!skills?.length) return null;

  // group skills by category
  const groups = skills.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groups).map(([category, list]) => (
          <div key={category} className="glass rounded-3xl p-6">
            <h3 className="mb-5 font-bold text-violet-200">{category}</h3>
            <div className="space-y-4">
              {list.map((s) => (
                <div key={s._id}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-white/40">{s.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}