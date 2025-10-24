// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
