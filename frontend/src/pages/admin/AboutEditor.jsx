import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/api";
import FormField from "../../components/admin/FormField";
import { aboutFields } from "../../lib/resources";
import { toForm, toPayload } from "../../lib/formUtils";

export default function AboutEditor() {
  const [form, setForm] = useState(toForm(aboutFields));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/about").then((res) => setForm(toForm(aboutFields, res.data)));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/about", toPayload(aboutFields, form));
      toast.success("About saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-8 text-3xl font-extrabold">About you</h2>
      <form onSubmit={save} className="glass space-y-5 rounded-3xl p-7">
        {aboutFields.map((f) => (
          <FormField key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
        ))}
        <button disabled={saving} className="btn-glow rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}