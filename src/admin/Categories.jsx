import { FiEdit3, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { TableSkeleton } from "../components/Skeleton.jsx";
import { api, buildImageFallback } from "../services/api.js";
import { confirmAction } from "../utils/confirmDialog.js";
import useDebouncedValue from "../hooks/useDebouncedValue.js";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebouncedValue(query, 180);

  async function loadCategories() {
    setLoading(true);
    try {
      const response = await api.categories.list({ includeInactive: "true" });
      setCategories(response.data.categories);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const filtered = useMemo(
    () => categories.filter((category) => category.name.toLowerCase().includes(debouncedQuery.toLowerCase())),
    [categories, debouncedQuery],
  );

  async function removeCategory(category) {
    const confirmed = await confirmAction({
      title: "Delete category?",
      text: `${category.name} will be removed if no products are using it.`,
      confirmButtonText: "Delete",
    });
    if (!confirmed) return;

    try {
      const response = await api.categories.delete(category.id);
      toast.success(response.message);
      loadCategories();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">Categories</p>
          <h1 className="mt-2 text-2xl font-medium text-[#261f18] sm:text-3xl">Manage categories</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-12 items-center gap-3 rounded-md border border-[#ead9bd] bg-white px-4 shadow-[0_14px_34px_rgba(89,57,23,0.08)] focus-within:ring-2 focus-within:ring-[#9f6133] lg:w-80">
            <FiSearch className="text-[#9f6133]" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories" className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </label>
          <Link to="/admin/categories/new" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#9f6133] px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)]">
            <FiPlus />
            Add
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-[#ead9bd] bg-white shadow-[0_18px_45px_rgba(89,57,23,0.08)]">
        {loading && !filtered.length ? (
          <>
            <AryaLoader label="Loading categories" />
            <TableSkeleton rows={6} />
          </>
        ) : filtered.length ? (
          <div className="divide-y divide-[#f0e0c8]">
            {filtered.map((category) => (
              <article key={category.id} className="grid gap-4 px-5 py-4 md:grid-cols-[84px_1fr_110px_110px] md:items-center">
                <ProductImage src={category.image} fallback={buildImageFallback(category, category.name)} alt={category.name} className="h-20 w-16 rounded-md border border-[#ead9bd] object-cover" />
                <p className="font-medium">{category.name}</p>
                <span className={`w-max rounded-full px-3 py-1 text-xs ${category.isActive ? "bg-[#edf7e8] text-[#467043]" : "bg-stone-100 text-stone-500"}`}>{category.isActive ? "Active" : "Hidden"}</span>
                <div className="flex gap-2 md:justify-end">
                  <Link to={`/admin/categories/${category.id}/edit`} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[#ead9bd] text-[#9f6133]" aria-label="Edit category">
                    <FiEdit3 />
                  </Link>
                  <button type="button" onClick={() => removeCategory(category)} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[#f1c9c9] text-[#d92945]" aria-label="Delete category">
                    <FiTrash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="px-5 py-12 text-center text-stone-500">No categories found.</p>
        )}
      </div>
    </section>
  );
}
