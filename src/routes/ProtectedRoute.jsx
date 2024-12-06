import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Authenticate";
import LoadingScreen from "../pages/LoadingScreen";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
