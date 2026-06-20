import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import { formatPrice, productInquiryLink } from "../utils/product.js";

export default function ProductCard({ product, animate = false, offerLabel }) {
  const discountLabel = Number(product.discountPercent || 0) > 0 ? `${product.discountPercent}% OFF` : "";
  const badgeLabel = product.badgeLabel || "Best Seller";

  return (
    <article data-animate={animate ? "" : undefined} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white p-2 shadow-[0_18px_45px_rgba(157,76,36,0.10)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#ffd0a8] hover:shadow-[0_28px_70px_rgba(217,41,69,0.18)]">
      <Link to={`/products/${product.id}`} className="focus-ring image-frame relative block aspect-[4/5] rounded-[20px] bg-amber-50">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-[#ff7a18] via-[#ff3d77] to-[#7c3aed] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(255,61,119,0.28)]">
          {badgeLabel}
        </span>
        {discountLabel && <span className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-[#d92945] shadow-[0_10px_22px_rgba(36,31,23,0.14)]">{discountLabel}</span>}
        <ProductImage
          src={product.image}
          fallback={product.fallbackImage}
          alt={product.name}
          className="transition duration-500 ease-out group-hover:scale-[1.025]"
        />
      </Link>
      <div className="flex flex-col flex-1 pt-4">
        <div className="flex items-start justify-between gap-3 min-h-11">
          <div>
            <p className="text-xs font-medium uppercase text-stone-500">{product.category}</p>
            <Link to={`/products/${product.id}`} className="mt-1 font-medium line-clamp-2 text-ink hover:text-rosewood">
              {product.name}
            </Link>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${product.in_stock ? "bg-sage text-stone-700" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
              {product.in_stock ? "In stock" : "Not in stock"}
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm leading-6 line-clamp-2 min-h-12 text-stone-500">{product.shortDescription || product.description}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-extrabold text-[#d92945]">{formatPrice(product.price)}</span>
          <span className="rounded-full bg-[#fff1f2] px-2 py-0.5 text-sm font-semibold text-[#fb7185] line-through">{formatPrice(product.originalPrice)}</span>
        </div>
        <a
          href={productInquiryLink(product.name, product.id, product.price)}
          className={`flex items-center justify-center w-full h-11 gap-2 mt-auto rounded-full text-sm font-bold transition border focus-ring ${
            product.in_stock
              ? "border-transparent bg-[#25D366] text-white shadow-[0_14px_28px_rgba(37,211,102,0.24)] hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-[0_18px_34px_rgba(37,211,102,0.32)]"
              : "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
          }`}
          aria-disabled={!product.in_stock}
          onClick={(event) => {
            if (!product.in_stock) event.preventDefault();
          }}
        >
          <MessageCircle size={17} />
          {product.in_stock ? "Order Now" : "Out of stock"}
        </a>
      </div>
    </article>
  );
}
