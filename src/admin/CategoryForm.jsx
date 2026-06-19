import { FiArrowLeft, FiImage, FiSave } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import { api } from "../services/api.js";

const emptyForm = { name: "", imageFile: null, imagePreview: "", isActive: true };

function revokePreviewUrl(url) {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

function previewForFile(file) {
  return file?.type?.startsWith("image/") ? URL.createObjectURL(file) : "";
}

function categoryFormData(form) {
  const data = new FormData();
  data.append("name", form.name);
  data.append("isActive", String(Boolean(form.isActive)));
  if (form.imageFile) data.append("image", form.imageFile);
  return data;
}

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    let active = true;
    async function loadCategory() {
      if (!isEditing) return;
      try {
        const response = await api.categories.get(id);
        if (!active) return;
        const category = response.data.category;
        setForm({ name: category.name, imageFile: null, imagePreview: category.image || "", isActive: category.isActive });
      } catch (error) {
        toast.error(error.message);
        navigate("/admin/categories", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    }
    loadCategory();
    return () => {
      active = false;
    };
  }, [id, isEditing, navigate]);

  useEffect(() => {
    return () => {
      revokePreviewUrl(form.imagePreview);
    };
  }, [form.imagePreview]);

  function updateImage(file) {
    setForm((current) => ({
      ...current,
      imageFile: file || null,
      imagePreview: file ? previewForFile(file) : current.imagePreview,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isEditing && !form.imageFile) {
      toast.error("Please select a category image from your device");
      return;
    }

    try {
      const response = isEditing ? await api.categories.update(id, categoryFormData(form)) : await api.categories.create(categoryFormData(form));
      toast.success(response.message);
      navigate("/admin/categories");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return <AryaLoader label="Loading category" />;
  }

  return (
    <section>
      <Link to="/admin/categories" className="focus-ring mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f6133]">
        <FiArrowLeft />
        Categories
      </Link>
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-md border border-[#ead9bd] bg-white p-6 shadow-[0_18px_45px_rgba(89,57,23,0.08)]">
        <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">{isEditing ? "Edit category" : "Add category"}</p>
        <h1 className="mt-2 text-2xl font-medium text-[#261f18]">{isEditing ? "Update category" : "Create category"}</h1>

        <label className="mt-6 grid gap-2 text-sm font-medium text-stone-700">
          Name
          <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>

        <label className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
          Category image
          <span className="flex min-h-28 items-center gap-4 rounded-md border border-[#ead9bd] bg-[#fffaf1] p-3">
            <span className="grid h-24 w-20 place-items-center overflow-hidden rounded-md border border-[#ead9bd] bg-white">
              {form.imagePreview ? <img src={form.imagePreview} alt="" className="h-full w-full object-cover" /> : <FiImage className="text-xl text-[#9f6133]" />}
            </span>
            <input type="file" required={!isEditing} onChange={(event) => updateImage(event.target.files?.[0])} className="block w-full text-sm text-stone-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#9f6133] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
          </span>
        </label>

        <label className="mt-4 flex h-6 items-center gap-2 text-sm font-medium text-stone-700">
          <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-4 w-4 accent-rosewood" />
          Active
        </label>

        <button type="submit" className="focus-ring mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#9f6133] px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)]">
          <FiSave />
          Save
        </button>
      </form>
    </section>
  );
}
