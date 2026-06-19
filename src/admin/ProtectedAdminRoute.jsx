import { Navigate, Outlet, useLocation } from "react-router-dom";
import AryaLoader from "../components/AryaLoader.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedAdminRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AryaLoader fullScreen label="Checking admin session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
