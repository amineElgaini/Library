import { request } from "@/utils/axios-utils";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useAuth from "../context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

// Get Loged In User
const getLogedInUserInfo = () => {
  return request({ url: "/getLogedInUserInfo" });
};

export const useGetLogedInUserInfo = () => {
  console.log("hi")
  return useQuery({
    queryKey: ["getLogedInUser"],
    queryFn: getLogedInUserInfo,
    retry: false,
    staleTime: Infinity
  });
};

// Login
const login = (credentials) => {
  return request({ method: "post", url: "/login", params: credentials });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/books";

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data?.data?.token);
      navigate(from, {
        replace: true,
      });
      localStorage.setItem("SayWelcomeMessage", "yes");
      queryClient.removeQueries();
    },
  });
};

// logout
const logout = () => {
  return request({ method: "post", url: "/logout" });
};

export const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth({});
      localStorage.removeItem("accessToken");
      navigate("/books");
      queryClient.removeQueries();
    },
  });
};
