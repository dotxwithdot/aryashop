import { FiEdit3, FiPlus, FiSearch, FiToggleLeft, FiToggleRight, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { TableSkeleton } from "../components/Skeleton.jsx";
import { api, normalizeProduct } from "../services/api.js";
import { confirmAction } from "../utils/confirmDialog.js";
import { formatPrice } from "../utils/product.js";
import useDebouncedValue from "../hooks/useDebouncedValue.js";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebouncedValue(query, 260);

  async function loadData(search = query) {
    setLoading(true);
    try {
      const response = await api.products.list({ includeInactive: "true", limit: "100", search });
      setProducts(response.data.products.map(normalizeProduct));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(debouncedQuery);
  }, [debouncedQuery]);

  async function handleSearch(event) {
    event.preventDefault();
    loadData(query);
  }

  async function removeProduct(product) {
    const confirmed = await confirmAction({
      title: "Delete product?",
      text: `${product.name} will be permanently removed.`,
      confirmButtonText: "Delete",
    });
    if (!confirmed) return;

    try {
      const response = await api.products.delete(product.id);
      toast.success(response.message);
      loadData(query);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function toggleStock(product) {
    try {
      const response = await api.products.update(product.id, { in_stock: !product.in_stock });
      toast.success(response.message);
      setProducts((current) => current.map((item) => (item.id === product.id ? normalizeProduct(response.data.product) : item)));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">Products</p>
          <h1 className="mt-2 text-2xl font-medium text-[#261f18] sm:text-3xl">Manage products</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <form onSubmit={handleSearch} className="flex h-12 items-center gap-3 rounded-md border border-[#ead9bd] bg-white px-4 shadow-[0_14px_34px_rgba(89,57,23,0.08)] focus-within:ring-2 focus-within:ring-[#9f6133] lg:w-96">
            <FiSearch className="text-[#9f6133]" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU, material" className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none" />
            <button type="submit" className="text-sm font-medium text-[#9f6133]">Go</button>
          </form>
          <Link to="/admin/products/new" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#9f6133] px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)]">
            <FiPlus />
            Add
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-[#ead9bd] bg-white shadow-[0_18px_45px_rgba(89,57,23,0.08)]">
        {loading && !products.length ? (
          <>
            <AryaLoader label="Loading products" />
            <TableSkeleton rows={7} />
          </>
        ) : products.length ? (
          <div className="divide-y divide-[#f0e0c8]">
            {products.map((product) => (
              <article key={product.id} className="grid gap-4 px-5 py-4 md:grid-cols-[84px_1fr_120px_120px_140px] md:items-center">
                <ProductImage src={product.image} fallback={product.fallbackImage} alt={product.name} className="h-20 w-16 rounded-md border border-[#ead9bd] object-cover" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-stone-500">{product.category}</p>
                </div>
                <p className="font-medium text-[#9f6133]">{formatPrice(product.price)}</p>
                <span className={`w-max rounded-full px-3 py-1 text-xs ${product.in_stock ? "bg-[#edf7e8] text-[#467043]" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
                  {product.in_stock ? "In stock" : "Not in stock"}
                </span>
                <div className="flex gap-2 md:justify-end">
                  <button type="button" onClick={() => toggleStock(product)} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[#ead9bd] text-[#9f6133]" aria-label="Toggle stock status" title="Toggle stock status">
                    {product.in_stock ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                  <Link to={`/admin/products/${product.id}/edit`} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[#ead9bd] text-[#9f6133]" aria-label="Edit product">
                    <FiEdit3 />
                  </Link>
                  <button type="button" onClick={() => removeProduct(product)} className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[#f1c9c9] text-[#d92945]" aria-label="Delete product">
                    <FiTrash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="px-5 py-12 text-center text-stone-500">No products found.</p>
        )}
      </div>
    </section>
  );
}
