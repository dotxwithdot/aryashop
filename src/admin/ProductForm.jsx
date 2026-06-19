import { FiArrowLeft, FiImage, FiSave } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import { api, normalizeProduct } from "../services/api.js";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  discountPercent: 0,
  badgeLabel: "Best Seller",
  imageFile: null,
  imagePreview: "",
  shortDescription: "",
  material: "",
  rating: 4.5,
  reviews: 0,
  reviewSummary: "Customers love the comfort, styling, and easy WhatsApp support from AryaShop.",
  stock: 0,
  in_stock: true,
  isFeatured: false,
  isActive: true,
};

function revokePreviewUrl(url) {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

function productFormData(form) {
  const finalPrice = Math.max(
    Math.round(Number(form.originalPrice || 0) - (Number(form.originalPrice || 0) * Number(form.discountPercent || 0)) / 100),
    0,
  );
  const data = new FormData();
  data.append("name", form.name);
  data.append("category", form.category);
  data.append("price", String(finalPrice));
  data.append("originalPrice", String(form.originalPrice));
  data.append("discountPercent", String(form.discountPercent || 0));
  data.append("badgeLabel", form.badgeLabel || "Best Seller");
  data.append("shortDescription", form.shortDescription);
  data.append("material", form.material || "");
  data.append("rating", String(form.rating || 4.5));
  data.append("reviews", String(form.reviews || 0));
  data.append("reviewSummary", form.reviewSummary || "");
  data.append("stock", String(form.stock || 0));
  data.append("in_stock", String(Boolean(form.in_stock)));
  data.append("isFeatured", String(Boolean(form.isFeatured)));
  data.append("isActive", String(Boolean(form.isActive)));
  data.append("highlights", JSON.stringify([form.material, "Easy WhatsApp inquiry", "Admin managed product"].filter(Boolean)));
  data.append("longDescription", form.shortDescription);
  if (form.imageFile) data.append("images", form.imageFile);
  return data;
}

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const categoryResponse = await api.categories.list({ includeInactive: "true" });
        if (active) setCategories(categoryResponse.data.categories);

        if (isEditing) {
          const productResponse = await api.products.get(id);
          if (!active) return;
          const product = normalizeProduct(productResponse.data.product);
          setForm({
            name: product.name,
            category: product.categoryId,
            price: product.price,
            originalPrice: product.originalPrice,
            discountPercent: product.discountPercent || 0,
            badgeLabel: product.badgeLabel || "Best Seller",
            imageFile: null,
            imagePreview: product.image || "",
            shortDescription: product.shortDescription || "",
            material: product.material || "",
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            reviewSummary: product.reviewSummary || "",
            stock: product.stock || 0,
            in_stock: product.in_stock,
            isFeatured: Boolean(product.isFeatured),
            isActive: Boolean(product.isActive),
          });
        }
      } catch (error) {
        toast.error(error.message);
        navigate("/admin/products", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id, isEditing, navigate]);

  useEffect(() => {
    return () => {
      revokePreviewUrl(form.imagePreview);
    };
  }, [form.imagePreview]);

  const activeCategories = useMemo(() => categories.filter((category) => category.isActive), [categories]);
  const finalPrice = Math.max(
    Math.round(Number(form.originalPrice || 0) - (Number(form.originalPrice || 0) * Number(form.discountPercent || 0)) / 100),
    0,
  );

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateImage(file) {
    setForm((current) => ({
      ...current,
      imageFile: file || null,
      imagePreview: file ? URL.createObjectURL(file) : current.imagePreview,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isEditing && !form.imageFile) {
      toast.error("Please select a product image from your device");
      return;
    }

    try {
      const response = isEditing ? await api.products.update(id, productFormData(form)) : await api.products.create(productFormData(form));
      toast.success(response.message);
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return <AryaLoader label="Loading product" />;
  }

  return (
    <section>
      <Link to="/admin/products" className="focus-ring mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f6133]">
        <FiArrowLeft />
        Products
      </Link>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-[#ead9bd] bg-white p-6 shadow-[0_18px_45px_rgba(89,57,23,0.08)] lg:grid-cols-4">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">{isEditing ? "Edit product" : "Add product"}</p>
          <h1 className="mt-2 text-2xl font-medium text-[#261f18]">{isEditing ? "Update product" : "Create product"}</h1>
        </div>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Name
          <input required value={form.name} onChange={(event) => update("name", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Category
          <select required value={form.category} onChange={(event) => update("category", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm">
            <option value="">Choose category</option>
            {activeCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Original price
          <input required type="number" min="0" value={form.originalPrice} onChange={(event) => update("originalPrice", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Discount percent
          <input required type="number" min="0" max="100" value={form.discountPercent} onChange={(event) => update("discountPercent", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Product badge
          <input value={form.badgeLabel} maxLength={80} onChange={(event) => update("badgeLabel", event.target.value)} placeholder="Best Seller" className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Final price
          <input readOnly value={finalPrice} className="h-11 rounded-md border border-[#ead9bd] bg-[#fffaf1] px-3 text-sm font-medium text-stone-700" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700 lg:col-span-2">
          Product image
          <span className="flex min-h-24 items-center gap-4 rounded-md border border-[#ead9bd] bg-[#fffaf1] p-3">
            <span className="grid h-20 w-16 place-items-center overflow-hidden rounded-md border border-[#ead9bd] bg-white">
              {form.imagePreview ? <img src={form.imagePreview} alt="" className="h-full w-full object-cover" /> : <FiImage className="text-xl text-[#9f6133]" />}
            </span>
            <input type="file" accept="image/*" required={!isEditing} onChange={(event) => updateImage(event.target.files?.[0])} className="block w-full text-sm text-stone-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#9f6133] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Stock number
          <input type="number" min="0" value={form.stock} onChange={(event) => update("stock", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Rating
          <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => update("rating", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Review count
          <input type="number" min="0" value={form.reviews} onChange={(event) => update("reviews", event.target.value)} className="focus-ring h-11 rounded-md border border-[#ead9bd] bg-white px-3 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700 lg:col-span-2">
          Short description
          <textarea required value={form.shortDescription} onChange={(event) => update("shortDescription", event.target.value)} className="focus-ring min-h-24 rounded-md border border-[#ead9bd] bg-white px-3 py-2 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700 lg:col-span-2">
          Review summary
          <textarea value={form.reviewSummary} maxLength={420} onChange={(event) => update("reviewSummary", event.target.value)} className="focus-ring min-h-24 rounded-md border border-[#ead9bd] bg-white px-3 py-2 text-sm" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Material
          <textarea value={form.material} onChange={(event) => update("material", event.target.value)} className="focus-ring min-h-24 rounded-md border border-[#ead9bd] bg-white px-3 py-2 text-sm" />
        </label>
        <div className="flex flex-col justify-end gap-3">
          <label className="flex h-6 items-center gap-2 text-sm font-medium text-stone-700">
            <input type="checkbox" checked={form.in_stock} onChange={(event) => update("in_stock", event.target.checked)} className="h-4 w-4 accent-rosewood" />
            In stock
          </label>
          <label className="flex h-6 items-center gap-2 text-sm font-medium text-stone-700">
            <input type="checkbox" checked={form.isFeatured} onChange={(event) => update("isFeatured", event.target.checked)} className="h-4 w-4 accent-rosewood" />
            Featured
          </label>
          <label className="flex h-6 items-center gap-2 text-sm font-medium text-stone-700">
            <input type="checkbox" checked={form.isActive} onChange={(event) => update("isActive", event.target.checked)} className="h-4 w-4 accent-rosewood" />
            Active
          </label>
          <button type="submit" className="focus-ring mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#9f6133] px-4 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)]">
            <FiSave />
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
