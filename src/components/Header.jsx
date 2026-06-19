import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/95 shadow-[0_6px_20px_rgba(126,88,24,0.05)] backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <NavLink to="/" className="focus-ring flex items-center gap-2 rounded-sm" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center bg-rosewood text-white shadow-[0_10px_24px_rgba(126,88,24,0.18)]">
            <ShoppingBag size={19} />
          </span>
          <span className="text-xl font-semibold tracking-normal text-ink">AryaShop</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `focus-ring rounded-sm text-sm font-medium transition hover:text-rosewood ${
                  isActive ? "text-rosewood" : "text-stone-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="focus-ring grid h-10 w-10 place-items-center border border-amber-200 bg-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-amber-100 bg-white md:hidden">
          <div className="container-shell grid py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `focus-ring rounded-sm px-1 py-3 text-sm font-medium ${
                    isActive ? "text-rosewood" : "text-stone-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
