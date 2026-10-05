import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, MapPin, Send } from "lucide-react";
import Section from "./Section";
import api from "../../lib/api";

const input =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-violet-400";

export default function ContactSection({ about }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await api.post("/contact", form);
      toast.success(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="leading-relaxed text-white/60">
            Have a project, an opportunity, or just want to say hi? Send me a message and I'll reply as soon as I can.
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/70">
            {about?.email && (
              <a href={`mailto:${about.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail size={18} className="text-violet-300" /> {about.email}
              </a>
            )}
            {about?.location && (
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-violet-300" /> {about.location}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={submit} className="glass space-y-4 rounded-3xl p-7 md:col-span-3">
          <input className={input} placeholder="Your name" required maxLength={100} value={form.name} onChange={update("name")} />
          <input className={input} type="email" placeholder="Your email" required maxLength={150} value={form.email} onChange={update("email")} />
          <textarea className={input} rows={5} placeholder="Your message" required maxLength={3000} value={form.message} onChange={update("message")} />
          <button disabled={sending} className="btn-glow inline-flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-60">
            {sending ? "Sending…" : "Send message"} <Send size={16} />
          </button>
        </form>
      </div>
    </Section>
  );
}