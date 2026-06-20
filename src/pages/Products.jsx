import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AryaLoader from "../components/AryaLoader.jsx";
import { api, normalizeProduct } from "../services/api.js";
import useGsapReveal from "../hooks/useGsapReveal.js";

const PAGE_SIZE = 12;

export default function Products() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, highestPrice: 0 });
  const [loading, setLoading] = useState(true);
  const scope = useGsapReveal({ stagger: 0.04, y: 18 });

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      try {
        const params = { page: String(page), limit: String(PAGE_SIZE) };
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
  }, [page]);

  const pageCount = meta.pages || 1;
  const currentPage = meta.page || page;

  return (
    <section ref={scope} className="container-shell py-12">
      <div data-animate>
        <SectionHeading
          eyebrow="Products"
          title="Explore AryaShop Collection"
          text="Browse AryaShop products loaded from the live catalog and explore product details before ordering."
        />
      </div>

      {loading && !products.length ? (
        <AryaLoader label="Loading products" />
      ) : products.length ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-amber-100 bg-white px-5 py-16 text-center shadow-[0_14px_38px_rgba(126,88,24,0.08)]">
          <p className="text-lg font-semibold text-ink">No products found</p>
          <p className="mt-2 text-sm text-stone-500">Please check again soon.</p>
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
