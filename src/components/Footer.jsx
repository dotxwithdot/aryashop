import { Clock, MapPin, PackageCheck, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
            <Link className="hover:text-rosewood" to="/about">About</Link>
            <Link className="hover:text-rosewood" to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Shop Categories</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <span>Indian Kurties</span>
            <span>Earrings</span>
            <span>Handbags</span>
            <span>Beauty Gift Sets</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Contact Info</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <span className="flex items-center gap-2"><MapPin size={17} /> AryaShop Studio, Jaipur, Rajasthan</span>
            <span className="flex items-center gap-2"><Phone size={17} /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Clock size={17} /> Mon-Sat, 10:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>
      <div className="border-t border-amber-100 py-5 text-center text-sm text-stone-500">
        &copy; {new Date().getFullYear()} AryaShop. All rights reserved.
      </div>
    </footer>
  );
}
