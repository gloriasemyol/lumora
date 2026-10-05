export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center text-sm text-white/40">
      © {new Date().getFullYear()} · Built with <span className="gradient-text font-semibold">Lumora</span>
    </footer>
  );
}