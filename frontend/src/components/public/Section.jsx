import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">{eyebrow}</p>
        <h2 className="mb-12 mt-2 text-3xl font-extrabold md:text-4xl">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}