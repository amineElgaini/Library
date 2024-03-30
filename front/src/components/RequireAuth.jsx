import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useGetLogedInUserInfo } from "@/hooks/useUsers";

const RequireAuth = ({ allowedRoles = [] }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const { data, isLoading } = useGetLogedInUserInfo();

  useEffect(() => {
    if (data?.data?.username) {
      setAuth({ roles: data.data.roles, username: data.data.username });
    }
  }, [data]);

  // require authentification
  if (allowedRoles.length === 0 && data?.data?.username) {
    return <Outlet />;
  }

  // require authorization
  if (data?.data?.roles.find((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }

  if (isLoading) {
    return "loading...";
  }

  if (!isLoading) {
    // you don't have required authorization
    if (data?.data?.username) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
    // you are not authentificated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
