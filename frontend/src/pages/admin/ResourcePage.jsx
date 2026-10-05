import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import api, { assetUrl } from "../../lib/api";
import FormField from "../../components/admin/FormField";
import { toForm, toPayload } from "../../lib/formUtils";

export default function ResourcePage({ config }) {
  const { key, label, fields, titleField, imageField, subtitle, readOnly } = config;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(toForm(fields));
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get(`/${key}`);
      setItems(data);
    } catch {
      toast.error("Could not load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(toForm(fields));
    setOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm(toForm(fields, item));
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(fields, form);
      if (editingId) await api.put(`/${key}/${editingId}`, payload);
      else await api.post(`/${key}`, payload);
      toast.success("Saved!");
      setOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this for good?")) return;
    try {
      await api.delete(`/${key}/${id}`);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold">{label}</h2>
        {!readOnly && (
          <button onClick={openNew} className="btn-glow flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
            <Plus size={18} /> Add new
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-white/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-white/50">Nothing here yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="glass flex items-center gap-4 rounded-2xl p-4">
              {imageField && item[imageField] && (
                <img src={assetUrl(item[imageField])} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item[titleField]}</p>
                {subtitle && <p className="truncate text-sm text-white/50">{subtitle(item)}</p>}
              </div>
              {!readOnly && (
                <button onClick={() => openEdit(item)} className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Edit">
                  <Pencil size={18} />
                </button>
              )}
              <button onClick={() => remove(item._id)} className="rounded-lg p-2 text-red-300/70 transition hover:bg-red-500/10 hover:text-red-300" aria-label="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form onSubmit={save} className="max-h-[90vh] w-full max-w-xl space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-[#12121c] p-7">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingId ? "Edit" : "Add"} {label.toLowerCase()}</h3>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            {fields.map((f) => (
              <FormField key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
            ))}

            <button disabled={saving} className="btn-glow w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60">
              {saving ? "Saving…" : "Save"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}