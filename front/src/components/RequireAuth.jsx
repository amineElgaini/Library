import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useGetLogedInUserInfo } from "@/hooks/useUsers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const RequireAuth = ({ allowedRoles = [] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // require لاuthentification
  if (allowedRoles.length === 0 && auth?.username) {
    return <Outlet />;
  }

  // require authorization
  if (auth?.roles?.find((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }

  // you don't have required authorization
  if (auth.username) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  // // you are not authentificated
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
