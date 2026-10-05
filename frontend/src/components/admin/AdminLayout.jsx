import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, User, LogOut, ExternalLink } from "lucide-react";
import { resources } from "../../lib/resources";
import { useAuth } from "../../context/AuthContext";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
    isActive ? "bg-violet-500/20 text-violet-200" : "text-white/60 hover:bg-white/5 hover:text-white"
  }`;

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen md:flex">
      <aside className="shrink-0 border-b border-white/10 p-4 md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:border-b-0 md:border-r md:p-6">
        <h1 className="gradient-text mb-4 text-2xl font-extrabold md:mb-8">Lumora</h1>

        <nav className="flex gap-1 overflow-x-auto md:flex-1 md:flex-col md:overflow-visible">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/about" className={linkClass}>
            <User size={18} /> About
          </NavLink>
          {resources.map((r) => (
            <NavLink key={r.key} to={`/admin/${r.key}`} className={linkClass}>
              <r.icon size={18} /> {r.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-3 flex gap-2 md:mt-4 md:flex-col">
          <a href="/" target="_blank" className={linkClass({ isActive: false })}>
            <ExternalLink size={18} /> View site
          </a>
          <button onClick={handleLogout} className={linkClass({ isActive: false })}>
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}