import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AryaLoader from "../components/AryaLoader.jsx";
import { api, normalizeProduct } from "../services/api.js";
import useDebouncedValue from "../hooks/useDebouncedValue.js";
import useGsapReveal from "../hooks/useGsapReveal.js";
import { formatPrice } from "../utils/product.js";

const PAGE_SIZE = 12;

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const dealFilter = searchParams.get("deal");
  const promoFilter = searchParams.get("promo");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, highestPrice: 0 });
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebouncedValue(search, 260);
  const scope = useGsapReveal({ stagger: 0.04, y: 18 });

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      try {
        const params = { page: String(page), limit: String(PAGE_SIZE), sort };
        if (debouncedSearch) params.search = debouncedSearch;
        if (categoryFilter) params.category = categoryFilter;
        if (dealFilter) params.deal = dealFilter;
        if (maxPrice) params.maxPrice = String(maxPrice);

        const response = await api.products.list(params);
        if (!active) return;
        setProducts(response.data.products.map(normalizeProduct));
        setMeta(response.meta);
      } catch (_error) {
        if (active) {
          setProducts([]);
          setMeta({ page: 1, pages: 1, total: 0, highestPrice: 0 });
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, [categoryFilter, dealFilter, maxPrice, page, debouncedSearch, sort]);

  const highestPrice = meta.highestPrice || Number(maxPrice) || 0;
  const pageCount = meta.pages || 1;
  const currentPage = meta.page || page;
  const activeOfferLabel = dealFilter === "499" ? "Under Rs.499" : promoFilter ? `${promoFilter}% OFF` : "";

  function updatePrice(value) {
    setMaxPrice(Number(value));
    setPage(1);
  }

  function updateSort(value) {
    setSort(value);
    setPage(1);
  }

  function updateSearch(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <section ref={scope} className="container-shell py-12">
      <div data-animate>
        <SectionHeading
          eyebrow={dealFilter === "499" ? "This Week Offer" : categoryFilter ? "Offer Collection" : "Products"}
          title={dealFilter === "499" ? "Under Rs.499" : categoryFilter ? categoryFilter : "Explore AryaShop Collection"}
          text={
            dealFilter === "499"
              ? "Only products priced at Rs.499 or less are shown here."
              : promoFilter
                ? `Selected ${categoryFilter?.toLowerCase()} products with ${promoFilter}% off offer labels.`
                : "Browse AryaShop products loaded from the live catalog and explore product details before ordering."
          }
        />
      </div>

      {activeOfferLabel && (
        <div data-animate className="mb-6 inline-flex rounded-full bg-[#d92945] px-5 py-2 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_26px_rgba(217,41,69,0.24)]">
          {activeOfferLabel}
        </div>
      )}

      <div data-animate className="mb-10 grid gap-4 rounded-2xl border border-amber-100 bg-mist p-4 shadow-[0_14px_38px_rgba(126,88,24,0.08)] md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Search
          <input
            type="search"
            value={search}
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Search products"
            className="focus-ring h-11 border border-stone-300 bg-white px-3 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Sort by
          <select value={sort} onChange={(event) => updateSort(event.target.value)} className="focus-ring h-11 border border-stone-300 bg-white px-3 text-sm">
            <option value="default">Recommended</option>
            <option value="low">Price low to high</option>
            <option value="high">Price high to low</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Price range: up to {formatPrice(maxPrice || highestPrice)}
          <input
            type="range"
            min="0"
            max={highestPrice}
            step="50"
            value={maxPrice || highestPrice}
            onChange={(event) => updatePrice(event.target.value)}
            className="h-11 accent-rosewood"
          />
        </label>

        <p className="text-sm text-stone-600">{loading ? "Updating..." : `${meta.total} products found`}</p>
      </div>

      {loading && !products.length ? (
        <AryaLoader label="Loading products" />
      ) : products.length ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} offerLabel={activeOfferLabel || undefined} />
          ))}
        </div>
      ) : (
        <div className="border border-amber-100 bg-white px-5 py-16 text-center shadow-[0_14px_38px_rgba(126,88,24,0.08)]">
          <p className="text-lg font-semibold text-ink">No products found</p>
          <p className="mt-2 text-sm text-stone-500">Try another search, category, or price range.</p>
        </div>
      )}

      <div data-animate className="mt-12 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => setPage(pageNumber)}
            className={`focus-ring h-10 w-10 border text-sm font-semibold ${
              pageNumber === currentPage ? "border-rosewood bg-rosewood text-white" : "border-amber-200 bg-white text-stone-700 hover:border-rosewood"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </section>
  );
}
