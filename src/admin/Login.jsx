import { FiEye, FiEyeOff, FiKey, FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AryaLoader from "../components/AryaLoader.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ gmail: location.state?.email || "", password: "", secretAdminKey: "" });
  const [visibleSecrets, setVisibleSecrets] = useState({ password: false, secretAdminKey: false });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(form);
      toast.success(response.message);
      navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleSecret(field) {
    setVisibleSecrets((current) => ({ ...current, [field]: !current[field] }));
  }

  return (
    <section className="grid min-h-screen place-items-center bg-[#f8f1e8] px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-md border border-[#ead9bd] bg-white p-7 shadow-[0_24px_70px_rgba(89,57,23,0.14)]">
        <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">Admin Login</p>
        <h1 className="mt-3 text-3xl font-medium text-[#261f18]">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">Server verified token access for AryaShop admin panel.</p>

        <label className="mt-7 grid gap-2 text-sm font-medium text-stone-700">
          Email
          <span className="flex h-12 items-center gap-3 rounded-md border border-[#ead9bd] bg-white px-4 focus-within:ring-2 focus-within:ring-[#9f6133]">
            <FiMail className="text-[#9f6133]" />
            <input
              type="email"
              required
              value={form.gmail}
              onChange={(event) => setForm({ ...form, gmail: event.target.value })}
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Enter admin email"
            />
          </span>
        </label>

        {[
          ["password", "Password", FiLock, "Your password"],
          ["secretAdminKey", "Secret admin key", FiKey, "Key from .env"],
        ].map(([field, label, Icon, placeholder]) => (
          <label key={field} className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
            {label}
            <span className="flex h-12 items-center gap-3 rounded-md border border-[#ead9bd] bg-white px-4 focus-within:ring-2 focus-within:ring-[#9f6133]">
              <Icon className="text-[#9f6133]" />
              <input
                type={visibleSecrets[field] ? "text" : "password"}
                minLength={field === "password" ? 8 : undefined}
                value={form[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={() => toggleSecret(field)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#9f6133] transition hover:bg-[#fff4df]"
                aria-label={visibleSecrets[field] ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                title={visibleSecrets[field] ? "Hide" : "Show"}
              >
                {visibleSecrets[field] ? <FiEyeOff /> : <FiEye />}
              </button>
            </span>
          </label>
        ))}

        <p className="mt-3 text-xs leading-5 text-stone-500">Use either your password or the secret admin key to login.</p>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 h-12 w-full rounded-md bg-[#9f6133] px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)] transition hover:bg-[#8b532b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <AryaLoader compact label="Checking" /> : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-stone-600">
          Need admin access?{" "}
          <Link to="/admin/register" className="font-medium text-[#9f6133]">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
