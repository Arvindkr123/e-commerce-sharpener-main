import React from "react";
import { useAuthContext } from "../../store/AuthContext";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return <Component />;
};

export default ProtectedRoute;
