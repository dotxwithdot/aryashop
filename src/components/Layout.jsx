import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fffefa] text-ink">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
