import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
