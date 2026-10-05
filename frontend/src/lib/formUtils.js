export const emptyForm = (fields) =>
  Object.fromEntries(
    fields.map((f) => [f.name, f.type === "checkbox" ? false : f.type === "number" ? 0 : ""])
  );

// database item -> form values
export const toForm = (fields, item = {}) => {
  const form = emptyForm(fields);
  fields.forEach((f) => {
    const v = item[f.name];
    if (v === undefined || v === null) return;
    form[f.name] = f.type === "tags" ? v.join(", ") : v;
  });
  return form;
};

// form values -> what we send to the backend
export const toPayload = (fields, form) => {
  const payload = { ...form };
  fields.forEach((f) => {
    if (f.type === "tags") {
      payload[f.name] = form[f.name].split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (f.type === "number") payload[f.name] = Number(form[f.name]) || 0;
  });
  return payload;
};