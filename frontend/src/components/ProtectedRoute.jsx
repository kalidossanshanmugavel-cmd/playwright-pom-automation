import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { homeFor } from "../roles";
export default function ProtectedRoute({ loading, user, roles, children }) {
  const location = useLocation();
  if (loading) return <Box sx={{ minHeight: "65vh", display: "grid", placeItems: "center" }}><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={homeFor(user.role)} replace />;
  return children;
}
