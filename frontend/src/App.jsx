import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import BlogList from "./pages/public/BlogList";
import BlogPost from "./pages/public/BlogPost";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AboutEditor from "./pages/admin/AboutEditor";
import ResourcePage from "./pages/admin/ResourcePage";
import { resources } from "./lib/resources";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<AboutEditor />} />
          {resources.map((r) => (
            <Route key={r.key} path={r.key} element={<ResourcePage key={r.key} config={r} />} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}