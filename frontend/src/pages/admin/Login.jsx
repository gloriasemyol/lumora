import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-violet-400";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px]" />
      <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="gradient-text text-3xl font-extrabold">Lumora</h1>
        <p className="mb-8 mt-1 text-sm text-white/50">Sign in to manage your portfolio</p>

        <label className="mb-1.5 block text-sm text-white/70">Email</label>
        <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />

        <label className="mb-1.5 mt-4 block text-sm text-white/70">Password</label>
        <input className={input} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

        <button disabled={loading} className="btn-glow mt-8 w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </motion.form>
    </div>
  );
}