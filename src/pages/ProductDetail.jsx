import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Clock, Gift, Heart, MessageCircle, RotateCcw, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import ProductSlider from "../components/ProductSlider.jsx";
import AryaLoader from "../components/AryaLoader.jsx";
import { api, normalizeProduct } from "../services/api.js";
import useGsapReveal from "../hooks/useGsapReveal.js";
import { formatPrice, productInquiryLink } from "../utils/product.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scope = useGsapReveal({ stagger: 0.06, y: 22 });

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      try {
        const response = await api.products.get(id);
        const nextProduct = normalizeProduct(response.data.product);
        if (!active) return;
        setProduct(nextProduct);
        setLoading(false);

        try {
          const relatedResponse = await api.products.list({
            category: nextProduct.categoryId,
            limit: "10",
          });
          if (active) {
            setRelatedProducts(relatedResponse.data.products.map(normalizeProduct).filter((item) => item.id !== nextProduct.id));
          }
        } catch (_error) {
          if (active) setRelatedProducts([]);
        }
      } catch (_error) {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <AryaLoader label="Loading product details" />;
  }

  if (!product) {
    return (
      <section className="container-shell py-16">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-rosewood">
          <ArrowLeft size={18} /> Back to products
        </Link>
      </section>
    );
  }

  return (
    <section ref={scope} className="container-shell py-12">
      <Link data-animate to="/products" className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rosewood shadow-[0_10px_24px_rgba(126,88,24,0.08)]">
        <ArrowLeft size={18} /> Back to products
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.68fr)_1fr] xl:grid-cols-[420px_1fr]">
        <div data-animate className="lg:sticky lg:top-24 lg:self-start">
          <div className="soft-card mx-auto max-w-[360px] overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#fff8f2] to-[#ffe5f0] p-3 shadow-[0_26px_70px_rgba(217,41,69,0.14)] sm:max-w-[400px] lg:max-w-none">
            <div className="image-frame relative aspect-[4/5] rounded-[22px]">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-[#ff7a18] via-[#ff3d77] to-[#7c3aed] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_14px_30px_rgba(255,61,119,0.30)]">
                {product.badgeLabel}
              </span>
              <ProductImage src={product.image} fallback={product.fallbackImage} alt={product.name} className="transition duration-500" />
            </div>
          </div>
        </div>

        <div data-animate className="lg:pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full bg-blush px-3 py-1 text-sm font-semibold uppercase tracking-[0.16em] text-rosewood">{product.category}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff1f2] px-3 py-1 text-sm font-semibold text-[#d92945]">
              <Star size={15} fill="currentColor" /> {product.rating} ({product.reviews} reviews)
            </span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${product.in_stock ? "bg-sage text-stone-700" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
              {product.in_stock ? "In stock" : "Not in stock"}
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-extrabold text-[#d92945]">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-[#fff1f2] px-3 py-1 text-lg font-semibold text-[#fb7185] line-through">{formatPrice(product.originalPrice)}</span>
            {product.discountPercent > 0 && <span className="rounded-full bg-gradient-to-r from-[#d92945] to-[#ff8a00] px-4 py-1.5 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(217,41,69,0.22)]">{product.discountPercent}% OFF</span>}
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">{product.shortDescription}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-[0_12px_30px_rgba(126,88,24,0.08)]">
                <BadgeCheck className="mt-0.5 shrink-0 text-rosewood" size={18} />
                <span className="text-sm leading-6 text-stone-700">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-[24px] border border-amber-100 bg-gradient-to-br from-[#fffaf0] via-white to-[#fff1f2] p-5 shadow-[0_18px_45px_rgba(126,88,24,0.10)] md:grid-cols-3">
            {[
              { icon: Truck, title: "Fast delivery", text: "Delivery in 5-7 days" },
              { icon: ShieldCheck, title: "Checked quality", text: "Packed after quick quality check" },
              { icon: RotateCcw, title: "Easy support", text: "Product help before ordering" },
              { icon: Gift, title: "Ready to gift", text: "Neat packaging for every order" },
              { icon: Clock, title: "Quick response", text: "Fast product details when needed" },
              { icon: Sparkles, title: "Fresh styles", text: "New picks added by AryaShop" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-2xl bg-white/80 p-3 shadow-[0_10px_24px_rgba(126,88,24,0.06)]">
                <item.icon className="shrink-0 text-[#d92945]" size={22} />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[24px] bg-mist p-5 shadow-[0_14px_34px_rgba(126,88,24,0.08)]">
            <h2 className="font-semibold">Long description</h2>
            <p className="mt-3 leading-7 text-stone-600">{product.longDescription}</p>
          </div>

          <div className="mt-5 rounded-[24px] bg-sage p-5 shadow-[0_14px_34px_rgba(126,88,24,0.08)]">
            <h2 className="font-semibold">Shipping from AryaShop.com</h2>
            <p className="mt-2 leading-7 text-stone-700">{product.shipping}</p>
          </div>

          <div className="mt-5 rounded-[24px] border border-[#ffd0a8] bg-white p-5 shadow-[0_18px_42px_rgba(217,41,69,0.10)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold">Customer review</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff1f2] px-3 py-1 text-sm font-bold text-[#d92945]">
                <Heart size={15} fill="currentColor" /> {product.rating}/5
              </span>
            </div>
            <p className="mt-3 leading-7 text-stone-600">{product.reviewSummary}</p>
            <p className="mt-3 text-sm font-semibold text-stone-500">Based on {product.reviews || "fresh"} customer responses.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={productInquiryLink(product.name, product.id)}
              aria-disabled={!product.in_stock}
              onClick={(event) => {
                if (!product.in_stock) event.preventDefault();
              }}
              className={`focus-ring inline-flex h-12 items-center justify-center gap-2 border px-6 text-sm font-semibold transition ${
                product.in_stock
                  ? "rounded-full border-transparent bg-gradient-to-r from-[#d92945] to-[#ff8a00] text-white shadow-[0_16px_32px_rgba(217,41,69,0.24)] hover:-translate-y-0.5"
                  : "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
              }`}
            >
              <MessageCircle size={18} />
              Ask about this item
            </a>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div data-animate className="mt-16 border-t border-amber-200 pt-10">
          <h2 className="mb-8 text-3xl font-semibold">You may also like</h2>
          <ProductSlider products={relatedProducts} sliderId="related" autoplay />
        </div>
      )}
    </section>
  );
}
