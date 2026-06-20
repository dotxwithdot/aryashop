import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AryaLoader from "../components/AryaLoader.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedAdminRoute() {
  const { isAuthenticated, loading, refreshSession } = useAuth();
  const location = useLocation();
  const [checkingRoute, setCheckingRoute] = useState(false);

  useEffect(() => {
    if (loading) return undefined;

    let active = true;
    setCheckingRoute(true);
    refreshSession().finally(() => {
      if (active) setCheckingRoute(false);
    });

    return () => {
      active = false;
    };
  }, [location.pathname, loading, refreshSession]);

  if (loading || checkingRoute) {
    return <AryaLoader fullScreen label="Checking admin session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
