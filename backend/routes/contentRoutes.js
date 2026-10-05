import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { makeCrud } from "../controllers/crudFactory.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Blog from "../models/Blog.js";
import Experience from "../models/Experience.js";
import Testimonial from "../models/Testimonial.js";
import Service from "../models/Service.js";
import Message from "../models/Message.js";

// publicRead = can visitors read it?   readOnly = admin can only list/delete
const resources = [
  { path: "skills", model: Skill, sort: { category: 1, level: -1 }, publicRead: true },
  { path: "projects", model: Project, sort: { order: 1, createdAt: -1 }, publicRead: true },
  { path: "blogs", model: Blog, sort: { createdAt: -1 }, publicRead: true },
  { path: "experience", model: Experience, sort: { order: 1, createdAt: -1 }, publicRead: true },
  { path: "testimonials", model: Testimonial, publicRead: true },
  { path: "services", model: Service, sort: { createdAt: 1 }, publicRead: true },
  { path: "messages", model: Message, publicRead: false, readOnly: true },
];

const router = express.Router();

resources.forEach(({ path, model, sort, publicRead, readOnly }) => {
  const crud = makeCrud(model, { sort });
  const r = express.Router();
  const readGuard = publicRead ? [] : [protect];

  r.get("/", readGuard, crud.getAll);

  // special: fetch one blog by its slug (must be BEFORE "/:id")
  if (path === "blogs") {
    r.get("/slug/:slug", async (req, res) => {
      const blog = await Blog.findOne({ slug: req.params.slug, published: true });
      if (!blog) return res.status(404).json({ message: "Not found" });
      res.json(blog);
    });
  }

  r.get("/:id", readGuard, crud.getOne);

  if (!readOnly) {
    r.post("/", protect, crud.create);
    r.put("/:id", protect, crud.update);
  }
  r.delete("/:id", protect, crud.remove);

  router.use(`/${path}`, r);
});

export default router;