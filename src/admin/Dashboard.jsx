import { FiAlertTriangle, FiGrid, FiShield, FiStar, FiTag } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { SkeletonBlock, TableSkeleton } from "../components/Skeleton.jsx";
import { api, normalizeProduct } from "../services/api.js";
import { formatPrice } from "../utils/product.js";

const cards = [
  ["products", "Products", FiTag],
  ["activeProducts", "Active", FiGrid],
  ["categories", "Categories", MdOutlineCategory],
  ["featuredProducts", "Featured", FiStar],
  ["admins", "Admins", FiShield],
  ["lowStock", "Low stock", FiAlertTriangle],
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await api.dashboard.stats();
        setDashboard(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const latestProducts = (dashboard?.latestProducts || []).map(normalizeProduct);
  const filteredProducts = latestProducts.filter((product) =>
    [product.name, product.category, product.offer].join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">Dashboard</p>
          <h1 className="mt-2 text-2xl font-medium text-[#261f18] sm:text-3xl">Admin overview</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#755f4c]">Essential product, category, stock, and admin data from protected APIs.</p>
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search latest products"
          className="focus-ring h-12 rounded-md border border-[#ead9bd] bg-white px-4 text-sm shadow-[0_16px_38px_rgba(89,57,23,0.08)] lg:w-80"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([key, label, Icon]) => (
          <article key={key} className="rounded-md border border-[#ead9bd] bg-white p-5 shadow-[0_18px_42px_rgba(89,57,23,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[#8a6a4e]">{label}</p>
              <span className="grid h-10 w-10 place-items-center rounded-md bg-[#fff3df] text-lg text-[#9f6133]">
                <Icon />
              </span>
            </div>
            {loading ? <SkeletonBlock className="mt-4 h-10 w-20" /> : <p className="mt-4 text-3xl font-medium text-[#261f18]">{dashboard?.stats?.[key] ?? 0}</p>}
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-[#ead9bd] bg-white shadow-[0_18px_45px_rgba(89,57,23,0.08)]">
        <div className="border-b border-[#ead9bd] px-5 py-4">
          <h2 className="text-lg font-medium">Latest products</h2>
        </div>
        {loading && !filteredProducts.length ? (
          <>
            <AryaLoader label="Loading dashboard" />
            <TableSkeleton rows={5} />
          </>
        ) : filteredProducts.length ? (
          <div className="divide-y divide-[#f0e0c8]">
            {filteredProducts.map((product) => (
              <article key={product.id} className="grid gap-4 px-5 py-4 md:grid-cols-[80px_1fr_140px_120px] md:items-center">
                <ProductImage src={product.image} fallback={product.fallbackImage} alt={product.name} className="h-20 w-16 rounded-md border border-[#ead9bd] object-cover" />
                <div>
                  <p className="font-medium text-[#261f18]">{product.name}</p>
                  <p className="mt-1 text-sm text-stone-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-[#9f6133]">{product.offer || "No offer"}</p>
                <p className="font-medium md:text-right">{formatPrice(product.price)}</p>
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
