import { FiEye, FiEyeOff, FiKey, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api.js";
import AryaLoader from "../components/AryaLoader.jsx";
import { useAuth } from "./AuthContext.jsx";

const emptyForm = { name: "", gmail: "", password: "", secretAdminKey: "" };

export default function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [visibleSecrets, setVisibleSecrets] = useState({ password: false, secretAdminKey: false });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/login" replace />;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleSecret(field) {
    setVisibleSecrets((current) => ({ ...current, [field]: !current[field] }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.auth.register(form);
      toast.success(response.message);
      navigate("/admin/login", { replace: true, state: { email: form.gmail } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid min-h-screen w-full place-items-center overflow-x-hidden bg-[#f8f1e8] px-3 py-6 sm:px-4 sm:py-12">
      <form onSubmit={handleRegister} className="w-full max-w-xl rounded-md border border-[#ead9bd] bg-white p-4 shadow-[0_24px_70px_rgba(89,57,23,0.14)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-[#9f6133]">Admin Register</p>
        <h1 className="mt-3 text-2xl font-medium text-[#261f18] sm:text-3xl">Create admin access</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">The secret admin key is checked on the backend before access is created.</p>

        <div className="grid gap-4 mt-7">
          {[
            ["name", "Name", "text", FiUser, "Your name"],
            ["gmail", "Email", "email", FiMail, "Enter admin email"],
            ["password", "Password", "password", FiLock, "Minimum 8 characters"],
            ["secretAdminKey", "Secret admin key", "password", FiKey, "Key from .env"],
          ].map(([field, label, type, Icon, placeholder]) => (
            <label key={field} className="grid gap-2 text-sm font-medium text-stone-700">
              {label}
              <span className="flex h-12 min-w-0 items-center gap-2 rounded-md border border-[#ead9bd] bg-white px-3 focus-within:ring-2 focus-within:ring-[#9f6133] sm:gap-3 sm:px-4">
                <Icon className="shrink-0 text-[#9f6133]" />
                <input
                  type={type === "password" && visibleSecrets[field] ? "text" : type}
                  required
                  minLength={field === "password" ? 8 : undefined}
                  value={form[field]}
                  onChange={(event) => update(field, event.target.value)}
                  className="flex-1 h-full min-w-0 text-sm bg-transparent outline-none"
                  placeholder={placeholder}
                />
                {type === "password" && (
                  <button
                    type="button"
                    onClick={() => toggleSecret(field)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#9f6133] transition hover:bg-[#fff4df]"
                    aria-label={visibleSecrets[field] ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                    title={visibleSecrets[field] ? "Hide" : "Show"}
                  >
                    {visibleSecrets[field] ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}
              </span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 h-12 w-full rounded-md bg-[#9f6133] px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(159,97,51,0.24)] transition hover:bg-[#8b532b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <AryaLoader compact label="Creating" /> : "Create admin"}
        </button>

        <p className="mt-5 text-sm text-center text-stone-600">
          Already have access?{" "}
          <Link to="/admin/login" className="font-medium text-[#9f6133]">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
