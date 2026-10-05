import { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import api, { assetUrl } from "../../lib/api";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none transition focus:border-violet-400";

function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    setUploading(true);
    try {
      const res = await api.post("/upload/image", data);
      onChange(res.data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <img src={assetUrl(value)} alt="" className="h-16 w-16 rounded-xl object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-white/20 text-white/30">
          <Upload size={20} />
        </div>
      )}
      <label className="cursor-pointer rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15">
        {uploading ? "Uploading…" : value ? "Change image" : "Choose image"}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  );
}

export default function FormField({ field, value, onChange }) {
  const label = (
    <label className="mb-1.5 block text-sm font-medium text-white/70">
      {field.label}
      {field.required && <span className="text-fuchsia-400"> *</span>}
    </label>
  );

  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-violet-500"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div>
      {label}
      {field.type === "textarea" ? (
        <textarea
          rows={field.rows || 4}
          className={inputClass}
          value={value}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "image" ? (
        <ImageUpload value={value} onChange={onChange} />
      ) : (
        <input
          type={field.type === "number" ? "number" : "text"}
          className={inputClass}
          value={value}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}