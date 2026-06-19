import { CheckCircle2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import useGsapReveal from "../hooks/useGsapReveal.js";

export default function About() {
  const scope = useGsapReveal();

  return (
    <section ref={scope} className="container-shell py-12">
      <div data-animate>
        <SectionHeading
          eyebrow="About AryaShop"
          title="A Modern Indian Fashion Store For Everyday Elegance"
          text="AryaShop is a frontend demo brand built around curated Indian fashion, accessories, and gifting for women and girls."
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <img
          data-animate
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=95&dpr=2"
          alt="Indian fashion store collection"
          className="h-[420px] w-full object-cover shadow-[0_18px_50px_rgba(126,88,24,0.13)]"
        />
        <div data-animate className="bg-mist p-7 shadow-[0_14px_36px_rgba(126,88,24,0.08)] md:p-10">
          <h2 className="text-2xl font-semibold">Our Brand Story</h2>
          <p className="mt-4 leading-7 text-stone-600">
            AryaShop celebrates the comfort, color, and detail of Indian dressing. The store brings together kurties,
            ethnic sets, jewellery, handbags, watches, dupattas, girls fashion, and gift-ready pieces in one clean,
            easy-to-browse experience.
          </p>
          <p className="mt-4 leading-7 text-stone-600">
            Every product page is designed to make inquiry simple through WhatsApp. This project is intentionally
            frontend-only, with static product data and dummy contact behavior.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          { title: "Mission", text: "To make Indian fashion discovery simpler, lighter, and more approachable for modern shoppers." },
          { title: "Quality Promise", text: "To present clear pricing, material notes, and product details before a customer starts a conversation." },
          { title: "Customer Trust", text: "To keep the experience transparent with no hidden cart, checkout, backend, or real email sending." },
        ].map((item) => (
          <div data-animate key={item.title} className="hover-lift border border-amber-100 bg-white p-6">
            <CheckCircle2 className="text-rosewood" size={24} />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div data-animate className="mt-14 bg-sage p-7 shadow-[0_14px_36px_rgba(126,88,24,0.08)] md:p-10">
        <h2 className="text-2xl font-semibold">Why Customers Trust Us</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {["Curated Indian fashion categories", "Simple WhatsApp inquiry flow", "Light and responsive shopping interface", "Clear frontend-only demo behavior"].map((text) => (
            <div key={text} className="flex items-center gap-3 text-stone-700">
              <CheckCircle2 className="shrink-0 text-rosewood" size={20} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
