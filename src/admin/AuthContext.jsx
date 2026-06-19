import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, clearToken, getToken, setToken } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      try {
        const response = await api.auth.me();
        if (active) setAdmin(response.data.user);
      } catch (_error) {
        if (getToken()) clearToken();
        if (active) setAdmin(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAdmin();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: Boolean(admin),
      async login(body) {
        const response = await api.auth.login(body);
        setToken(response.data.token);
        setAdmin(response.data.user);
        return response;
      },
      completeLogin(user, token) {
        setToken(token);
        setAdmin(user);
      },
      async logout() {
        try {
          await api.auth.logout();
        } finally {
          clearToken();
          setAdmin(null);
        }
      },
    }),
    [admin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
