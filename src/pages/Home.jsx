import { ArrowRight, BadgeCheck, Gift, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import useGsapReveal from "../hooks/useGsapReveal.js";
import kurti from "../assets/home/kurti.jpg"
import first_section from "../assets/home/at299.jpg"
import handbags from "../assets/home/handbags.jpg"

const fallbackImage = "https://placehold.co/900x1125/fff8e8/8a641f.png?text=AryaShop&font=montserrat";

const offerSections = [
  {
    title: "Buy 1 Get 3",
    subtitle: "Today's Offer",
    badge: "Everything at ₹299",
    text: "Pick stylish budget finds at one sweet price today.",
    to: "/products?category=gift",
    image:
    first_section,
    fallback: fallbackImage,
    featured: true,
    is_top : true
  },
  {
    title: "Indian Girls Kurties",
    subtitle: "Kurti Collection",
    badge: "50% OFF",
    text: "Fresh ethnic styles for everyday and festive dressing.",
    to: "/products?category=kurti",
    image:
    kurti,
    fallback: fallbackImage,
    is_top : true
  },
  {
    title: "Ladies Handbags",
    subtitle: "Bag Edit",
    badge: "40% OFF",
    text: "Polished handbags, totes, slings, and festive carry pieces.",
    to: "/products?category=bags",
    image:handbags,
    fallback: fallbackImage,
    is_top : false
  },
];

const promiseCards = [
  { icon: Truck, title: "Fast delivery", text: "Most orders reach you in 5-7 days with careful dispatch." },
  { icon: ShieldCheck, title: "Quality checked", text: "Every product is reviewed before packing for a neat finish." },
  { icon: MessageCircle, title: "WhatsApp help", text: "Ask size, style, and product questions before you buy." },
  { icon: Gift, title: "Gift-ready packing", text: "Pretty, clean packaging that feels special from the first look." },
];

const faqs = [
  { question: "How fast will AryaShop deliver?", answer: "Most orders are prepared quickly and delivered in 5-7 days depending on location." },
  { question: "Can I ask questions before ordering?", answer: "Yes. Every product has WhatsApp support so customers can ask about size, fabric, and availability." },
  { question: "Are these offers real products?", answer: "Yes, offers are shown from the live catalog and can be updated by the admin anytime." },
  { question: "What if I need help choosing?", answer: "AryaShop support can suggest styles according to use, budget, and occasion." },
];

function HeroSection() {
  return (
    <section data-animate className="container-shell pb-6 pt-2 md:pb-8">
      <div className="relative grid min-h-[520px] overflow-hidden rounded-[34px] bg-gradient-to-br from-[#fff0d9] via-[#ffe4ef] to-[#e7ddff] shadow-[0_30px_90px_rgba(217,41,69,0.20)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <span className="mb-5 inline-flex w-max items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#d92945] shadow-[0_12px_28px_rgba(217,41,69,0.16)]">
            <Sparkles size={16} /> New AryaShop picks
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-ink md:text-6xl">
            AryaShop brings colorful fashion home faster.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-700 md:text-lg">
            Discover kurties, handbags, gifts, and everyday styles with attractive offers, helpful WhatsApp support, and delivery promises made for happy shoppers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#d92945] to-[#ff8a00] px-6 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(217,41,69,0.28)] transition hover:-translate-y-0.5">
              Shop collection <ArrowRight size={18} />
            </Link>
            <Link to="/products?deal=299" className="focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-[#d92945] shadow-[0_16px_32px_rgba(36,31,23,0.10)] transition hover:-translate-y-0.5">
              View offers
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["5-7 days", "Delivery promise"],
              ["Best seller", "Admin badges"],
              ["Easy chat", "Before order support"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/80 p-4 shadow-[0_14px_30px_rgba(126,88,24,0.10)]">
                <p className="text-lg font-extrabold text-[#d92945]">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[320px]">
          <ProductImage src={kurti} fallback={fallbackImage} alt="AryaShop fashion collection" className="absolute inset-0 h-full w-full object-cover object-top" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffe4ef] via-transparent to-transparent lg:from-[#ffe4ef]/70" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[26px] bg-white/90 p-5 shadow-[0_20px_45px_rgba(36,31,23,0.16)] backdrop-blur">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 shrink-0 text-[#d92945]" size={22} />
              <div>
                <p className="font-extrabold text-ink">Fresh styles, quick support</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">Dummy promise cards and product badges help customers notice deals faster.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">{offer.subtitle}</p>
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
      <HeroSection />
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
      {offerSections.map((offer) => (
        <OfferSection key={offer.title} offer={offer} />
      ))}
      <section data-animate className="container-shell py-8 md:py-12">
        <div className="rounded-[30px] bg-gradient-to-br from-[#241f17] via-[#5b2234] to-[#d92945] p-6 text-white shadow-[0_30px_90px_rgba(36,31,23,0.20)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#ffd0a8]">Questions</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">FAQs for happy shopping</h2>
              <p className="mt-4 leading-7 text-white/78">Simple dummy answers that build trust around delivery, chat support, and offers.</p>
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
