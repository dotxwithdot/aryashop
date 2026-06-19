import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { useMemo, useState } from "react";
import ProductImage from "../components/ProductImage.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { products } from "../data/products.js";
import useGsapReveal from "../hooks/useGsapReveal.js";
import { formatPrice } from "../utils/product.js";

const PAGE_SIZE = 10;

export default function AdminPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const scope = useGsapReveal({ stagger: 0.04, y: 16 });

  const filteredProducts = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) return products;

    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      const isProductIdSearch = /^\d+$/.test(searchValue);

      return productName.includes(searchValue) || (isProductIdSearch && product.id === Number(searchValue));
    });
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const firstProduct = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(firstProduct, firstProduct + PAGE_SIZE);

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  function goToPage(nextPage) {
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  }

  return (
    <section ref={scope} className="container-shell py-12">
      <div data-animate className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Admin"
          title="Product Inventory"
          text="View product ids, names, prices, and thumbnails from the AryaShop product catalog."
        />

        <div className="mb-9 grid gap-2 text-sm font-medium text-stone-700 lg:w-[380px]">
          Search products
          <label className="focus-within:ring-2 focus-within:ring-rosewood focus-within:ring-offset-2 flex h-12 items-center gap-3 border border-amber-200 bg-white px-4 shadow-[0_14px_38px_rgba(126,88,24,0.08)]">
            <FiSearch className="shrink-0 text-rosewood" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search by product name or id"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-normal text-ink outline-none placeholder:text-stone-400"
            />
          </label>
        </div>
      </div>

      <div data-animate className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-amber-100 bg-mist px-4 py-3 text-sm text-stone-700 shadow-[0_14px_38px_rgba(126,88,24,0.08)]">
        <p>
          Showing <span className="font-semibold text-ink">{visibleProducts.length}</span> of{" "}
          <span className="font-semibold text-ink">{filteredProducts.length}</span> products
        </p>
        <p className="font-medium text-rosewood">10 products per page</p>
      </div>

      <div data-animate className="overflow-hidden border border-amber-200 bg-white shadow-[0_18px_45px_rgba(126,88,24,0.08)]">
        <div className="hidden grid-cols-[110px_1fr_130px_170px] border-b border-amber-100 bg-[#fff8e8] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-stone-600 md:grid">
          <span>Thumbnail</span>
          <span>Name</span>
          <span>Product Id</span>
          <span className="text-right">Price</span>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="divide-y divide-amber-100">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="grid gap-4 px-4 py-4 md:grid-cols-[110px_1fr_130px_170px] md:items-center md:px-5"
              >
                <ProductImage
                  src={product.image}
                  fallback={product.fallbackImage}
                  alt={product.name}
                  className="h-24 w-20 border border-amber-100 object-cover"
                />

                <div className="min-w-0">
                  <p className="text-base font-semibold text-ink">{product.name}</p>
                  <p className="mt-1 text-sm text-stone-500">{product.category}</p>
                </div>

                <p className="text-sm text-stone-600">
                  <span className="font-semibold text-ink md:hidden">Product Id: </span>
                  {product.id}
                </p>

                <p className="text-base font-bold text-rosewood md:text-right">{formatPrice(product.price)}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <p className="text-lg font-semibold text-ink">No products found</p>
            <p className="mt-2 text-sm text-stone-500">Try another product name or id.</p>
          </div>
        )}
      </div>

      <div data-animate className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="focus-ring grid h-10 w-10 place-items-center border border-amber-200 bg-white text-stone-700 transition hover:border-rosewood hover:text-rosewood disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Previous page"
        >
          <FiChevronLeft />
        </button>

        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => goToPage(pageNumber)}
            className={`focus-ring h-10 w-10 border text-sm font-semibold ${
              pageNumber === currentPage
                ? "border-rosewood bg-rosewood text-white"
                : "border-amber-200 bg-white text-stone-700 hover:border-rosewood"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="focus-ring grid h-10 w-10 place-items-center border border-amber-200 bg-white text-stone-700 transition hover:border-rosewood hover:text-rosewood disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Next page"
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
