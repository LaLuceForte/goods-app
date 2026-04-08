import type React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const localStorageToken = localStorage.getItem("authToken"),
    sessionStorageToken = sessionStorage.getItem("authToken");

  if (!localStorageToken && !sessionStorageToken) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
