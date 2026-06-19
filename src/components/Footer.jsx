import { PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappLink } from "../utils/product.js";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-amber-100 bg-mist">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">AryaShop</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
            Light, polished Indian fashion and accessories for daily dressing, gifting, and festive moments.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-stone-600">
            <span className="flex items-center gap-2"><ShieldCheck size={17} /> Quality checked pieces</span>
            <span className="flex items-center gap-2"><PackageCheck size={17} /> Packed with care before dispatch</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Useful Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <Link className="hover:text-rosewood" to="/">Home</Link>
            <Link className="hover:text-rosewood" to="/products">Products</Link>
            <a className="font-semibold text-[#128C7E] hover:text-[#075E54]" href={whatsappLink("Hi AryaShop, I want to ask about your products.")}>Ask on WhatsApp</a>
            <Link className="hover:text-rosewood" to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Shop Categories</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <span>Indian Kurties</span>
            <span>Earrings</span>
            <span>Weekly Offers</span>
            <span>Beauty Gift Sets</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Shopping Care</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <span className="flex items-center gap-2"><Sparkles size={17} /> Fresh styles for every week</span>
            <span className="flex items-center gap-2"><ShieldCheck size={17} /> Clear product details</span>
            <span className="flex items-center gap-2"><PackageCheck size={17} /> Neat order preparation</span>
          </div>
        </div>
      </div>
      <div className="border-t border-amber-100 py-5 text-center text-sm text-stone-500">
        &copy; {new Date().getFullYear()} AryaShop. All rights reserved.
      </div>
    </footer>
  );
}
