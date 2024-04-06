import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/context/useAuth";

const RequireAuth = ({ allowedRoles = [] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // require authentication
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
  // you are not authentificated
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
