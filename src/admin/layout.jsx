import { FiGrid, FiShoppingBag } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f8f1e8] text-[#261f18]">
      <header className="border-b border-[#ead9bd] bg-white/95 shadow-[0_10px_30px_rgba(89,57,23,0.08)] backdrop-blur">
        <div className="container-shell flex h-16 items-center justify-between">
          <Link to="/admin" className="focus-ring flex items-center gap-2 rounded-sm">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#9f6133] text-white shadow-[0_14px_28px_rgba(159,97,51,0.24)]">
              <FiGrid />
            </span>
            <span className="text-xl font-medium tracking-normal text-[#261f18]">AryaShop Admin</span>
          </Link>

          <Link
            to="/products"
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-[#ead9bd] bg-white px-4 text-sm font-medium text-stone-700 transition hover:border-[#9f6133] hover:text-[#9f6133]"
          >
            <FiShoppingBag />
            Products
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
