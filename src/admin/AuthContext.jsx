import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await api.auth.me();
      setAdmin(response.data.user);
      return true;
    } catch (_error) {
      setAdmin(null);
      return false;
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      await refreshSession();
      if (active) setLoading(false);
    }

    loadAdmin();
    return () => {
      active = false;
    };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: Boolean(admin),
      refreshSession,
      async login(body) {
        const loginResponse = await api.auth.login(body);
        const hasSession = await refreshSession();
        if (!hasSession) throw new Error("Login failed because the browser did not save the admin session cookie.");
        return loginResponse;
      },
      async logout() {
        try {
          await api.auth.logout();
        } finally {
          setAdmin(null);
        }
      },
    }),
    [admin, loading, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
