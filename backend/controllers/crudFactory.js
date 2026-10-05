export const makeCrud = (Model, { sort = { createdAt: -1 } } = {}) => ({
  getAll: async (req, res) => {
    const filter = {};
    // lets us ask for ?published=true on blogs
    if (Model.schema.path("published") && req.query.published !== undefined) {
      filter.published = req.query.published === "true";
    }
    res.json(await Model.find(filter).sort(sort));
  },

  getOne: async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  },

  create: async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  },

  update: async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  },

  remove: async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  },
});