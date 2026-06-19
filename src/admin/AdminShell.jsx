import { useState } from "react";
import { FiGrid, FiLogOut, FiMenu, FiShoppingBag, FiTag, FiX } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { confirmAction } from "../utils/confirmDialog.js";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/admin/categories", label: "Categories", icon: MdOutlineCategory },
  { to: "/admin/products", label: "Products", icon: FiTag },
];

export default function AdminShell() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    const confirmed = await confirmAction({
      title: "Logout?",
      text: "Your admin session will be closed on this device.",
      confirmButtonText: "Logout",
    });
    if (!confirmed) return;
    await logout();
    navigate("/admin/login", { replace: true });
  }

  const sidebar = (
    <aside className="flex h-full w-[min(18rem,calc(100vw-2rem))] flex-col border-r border-[#ead9bd] bg-[#fffaf1] px-4 py-5 shadow-[18px_0_45px_rgba(89,57,23,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="focus-ring flex items-center gap-3 rounded-sm">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-[#9f6133] text-xl text-white shadow-[0_14px_28px_rgba(159,97,51,0.24)]">
            <FiShoppingBag />
          </span>
          <span>
            <span className="block text-lg font-medium text-[#261f18]">AryaShop</span>
            <span className="block text-xs text-[#8a6a4e]">Admin panel</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-[#ead9bd] bg-white text-[#6d5138] lg:hidden"
          aria-label="Close menu"
        >
          <FiX />
        </button>
      </div>

      <nav className="mt-8 grid gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `focus-ring flex h-12 items-center gap-3 rounded-md px-4 text-sm font-normal transition ${
                isActive
                  ? "bg-[#9f6133] text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)]"
                  : "text-[#6d5138] hover:bg-white hover:text-[#9f6133] hover:shadow-[0_10px_26px_rgba(89,57,23,0.08)]"
              }`
            }
          >
            <item.icon className="text-lg" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-md border border-[#ead9bd] bg-white p-4 shadow-[0_14px_32px_rgba(89,57,23,0.08)]">
        <p className="text-xs text-[#8a6a4e]">Signed in as</p>
        <p className="mt-1 truncate text-sm font-medium text-[#261f18]">{admin?.name || "Admin"}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to="/products"
            className="focus-ring grid h-10 place-items-center rounded-md border border-[#ead9bd] bg-[#fffaf1] text-[#6d5138] transition hover:text-[#9f6133]"
            aria-label="View storefront"
            title="View storefront"
          >
            <FiShoppingBag />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="focus-ring grid h-10 place-items-center rounded-md border border-[#f1c9c9] bg-[#fff5f5] text-[#c24141] transition hover:bg-[#ffe9e9]"
            aria-label={`Logout ${admin?.name || "admin"}`}
            title={`Logout ${admin?.name || "admin"}`}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7e6_0,#f8f1e8_34%,#f6ede4_100%)] text-[#261f18]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          className={`absolute inset-0 bg-[#261f18]/35 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
        <div className={`relative h-full w-[min(18rem,calc(100vw-2rem))] transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</div>
      </div>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[#ead9bd] bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(89,57,23,0.08)] backdrop-blur md:px-6">
          <div className="flex min-h-12 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#ead9bd] bg-[#fffaf1] text-[#6d5138] lg:hidden"
                aria-label="Open admin menu"
              >
                <FiMenu />
              </button>
              <div className="min-w-0">
                <p className="text-xs text-[#8a6a4e]">Admin workspace</p>
                <h1 className="truncate text-base font-medium text-[#261f18] sm:text-lg">Manage AryaShop store</h1>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-md border border-[#ead9bd] bg-[#fffaf1] px-3 py-2 text-sm text-[#6d5138] sm:flex">
              <FiShoppingBag className="text-[#9f6133]" />
              <span className="truncate">{admin?.name || "Admin"}</span>
            </div>
          </div>
        </header>

        <main className="px-4 pb-28 pt-6 md:px-6 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-[#ead9bd] bg-white/95 p-2 shadow-[0_18px_55px_rgba(89,57,23,0.18)] backdrop-blur lg:hidden" aria-label="Admin mobile navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `focus-ring grid min-h-14 place-items-center rounded-xl px-2 py-1 text-[11px] font-medium transition ${
                isActive
                  ? "bg-[#9f6133] text-white shadow-[0_12px_24px_rgba(159,97,51,0.24)]"
                  : "text-[#6d5138] hover:bg-[#fffaf1] hover:text-[#9f6133]"
              }`
            }
          >
            <item.icon className="text-lg" />
            <span className="mt-1 max-w-full truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
