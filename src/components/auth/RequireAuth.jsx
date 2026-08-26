import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

const RequireAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 🔒 Strictly allow ONLY AGENT role
  if (user.role !== "AGENT") {
    logout();
    alert(
      "Access denied. This dashboard is strictly for authorized agents only.",
    );
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
