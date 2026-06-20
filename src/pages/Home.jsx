import { ArrowRight, Gift, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import useGsapReveal from "../hooks/useGsapReveal.js";
import kurti from "../assets/home/kurti.jpg"
import first_section from "../assets/home/at299.jpg"

const fallbackImage = "https://placehold.co/900x1125/fff8e8/8a641f.png?text=AryaShop&font=montserrat";

const offerSections = [
  {
    title: "Buy 2 Get 1 Free",
    subtitle: "This Week Offer",
    badge: "Under Rs.499",
    text: "Pick stylish weekly offer finds and unlock one extra piece with your set.",
    to: "/products",
    image:
    first_section,
    fallback: fallbackImage,
    featured: true,
    is_top : true
  },
  {
    title: "Arya Kurti Collection",
    subtitle: "Kurti Collection",
    badge: "50% OFF",
    text: "Fresh ethnic styles for everyday and festive dressing.",
    to: "/products",
    image:
    kurti,
    fallback: fallbackImage,
    is_top : true
  },
];

const promiseCards = [
  { icon: Truck, title: "Fast delivery", text: "Most orders reach you in 5-7 days with careful dispatch." },
  { icon: ShieldCheck, title: "Quality checked", text: "Every product is reviewed before packing for a neat finish." },
  { icon: MessageCircle, title: "Style help", text: "Ask size, style, and product questions before you buy." },
  { icon: Gift, title: "Gift-ready packing", text: "Pretty, clean packaging that feels special from the first look." },
];

const faqs = [
  { question: "How fast will AryaShop deliver?", answer: "Most orders are prepared quickly and delivered in 5-7 days depending on location." },
  { question: "Can I ask questions before ordering?", answer: "Yes. AryaShop can help customers with size, fabric, and availability details." },
  { question: "Are these offers real products?", answer: "Yes, offers are shown from the live catalog and can be updated by the admin anytime." },
  { question: "What if I need help choosing?", answer: "AryaShop support can suggest styles according to use, budget, and occasion." },
];

function OfferSection({ offer }) {
  return (
    <section data-animate className="py-5 container-shell md:py-7">
      <Link
        to={offer.to}
        className={`focus-ring group grid overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_22px_65px_rgba(217,41,69,0.12)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(217,41,69,0.20)] ${
          offer.featured ? "min-h-[430px] md:grid-cols-[0.92fr_1.08fr]" : "min-h-[340px] md:grid-cols-[1fr_1fr]"
        }`}
      >
        <div className="relative flex flex-col justify-center gap-5 bg-gradient-to-br from-white via-[#fffaf0] to-[#fff1f2] p-7 sm:p-9 lg:p-12">
          
          <div>
            <p className="inline-flex rounded-full bg-gradient-to-r from-[#ff7a18] via-[#d92945] to-[#7c3aed] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_34px_rgba(217,41,69,0.28)]">{offer.subtitle}</p>
            <h1 className={`${offer.featured ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl"} mt-3 max-w-xl font-extrabold leading-tight text-ink`}>
              {offer.title}
            </h1>
            <p className="max-w-md mt-4 text-base leading-7 text-stone-600 md:text-lg">{offer.text}</p>
          </div>
          <span className="inline-flex h-12 w-max items-center gap-2 rounded-full bg-gradient-to-r from-[#d92945] to-[#ff8a00] px-6 text-sm font-extrabold text-white shadow-[0_16px_32px_rgba(217,41,69,0.24)] transition group-hover:-translate-y-0.5">
            Shop Now
            <ArrowRight size={18} />
          </span>
        </div>
        <div className="relative w-full min-h-[260px] overflow-hidden md:min-h-full">
          <ProductImage
            src={offer.image}
            fallback={offer.fallback}
            alt={offer.title}
            className={`absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105 ${
              offer.is_top ? "object-top" : "object-center"
            }`}
            loading="eager"
          />
          <div className="absolute right-5 top-5 rounded-full bg-[#d92945] px-4 py-2 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(217,41,69,0.32)]">
            {offer.badge}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default function Home() {
  const scope = useGsapReveal({ stagger: 0.08, y: 24 });

  return (
    <div ref={scope} className="bg-[linear-gradient(180deg,#fff7f8_0%,#fffaf0_48%,#ffffff_100%)] py-6 md:py-8">
      {offerSections.map((offer) => (
        <OfferSection key={offer.title} offer={offer} />
      ))}
      <section data-animate className="container-shell py-6 md:py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {promiseCards.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white bg-white p-5 shadow-[0_18px_45px_rgba(126,88,24,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(217,41,69,0.16)]">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#d92945] to-[#ff8a00] text-white shadow-[0_12px_28px_rgba(217,41,69,0.24)]">
                <item.icon size={22} />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section data-animate className="container-shell py-8 md:py-12">
        <div className="rounded-[30px] bg-gradient-to-br from-[#241f17] via-[#5b2234] to-[#d92945] p-6 text-white shadow-[0_30px_90px_rgba(36,31,23,0.20)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#ffd0a8]">Questions</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">FAQs for happy shopping</h2>
              <p className="mt-4 leading-7 text-white/78">Clear answers around delivery, product help, and weekly offers.</p>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl bg-white/10 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-white/78">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
