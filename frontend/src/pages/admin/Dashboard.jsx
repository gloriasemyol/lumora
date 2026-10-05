import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import { resources } from "../../lib/resources";

export default function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all(
      resources.map((r) =>
        api
          .get(`/${r.key}`)
          .then((res) => [r.key, res.data.length])
          .catch(() => [r.key, 0])
      )
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-extrabold">Welcome back 👋</h2>
      <p className="mb-8 mt-1 text-white/50">Here's what's inside your portfolio.</p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((r) => (
          <Link
            key={r.key}
            to={`/admin/${r.key}`}
            className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <r.icon className="mb-4 text-violet-300" />
            <p className="text-4xl font-extrabold">{counts[r.key] ?? "–"}</p>
            <p className="mt-1 text-sm text-white/50">{r.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}