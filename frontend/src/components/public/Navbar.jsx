import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  ["About", "/#about"],
  ["Skills", "/#skills"],
  ["Projects", "/#projects"],
  ["Experience", "/#experience"],
  ["Contact", "/#contact"],
];

const linkClass = "text-sm font-medium text-white/60 transition hover:text-white";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0a0a12]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="gradient-text text-xl font-extrabold tracking-tight">
          Lumora
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className={linkClass}>
              {label}
            </a>
          ))}
          <Link to="/blog" className={linkClass}>
            Blog
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-white/5 px-5 py-5 md:hidden">
          {links.map(([label, href]) => (
            <a key={label} href={href} className={linkClass} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <Link to="/blog" className={linkClass} onClick={() => setOpen(false)}>
            Blog
          </Link>
        </div>
      )}
    </header>
  );
}