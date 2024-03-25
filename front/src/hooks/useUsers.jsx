import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";

const fetchUsers = () => {
  return request({ url: "/users" });
};

const addUser = (user) => {
  return request({ url: "/users", method: "post", data: user });
};

const getLogedInUserInfo = () => {
  return request({ url: "/getLogedInUserInfo" });
};

export const useGetLogedInUserInfo = () => {
  return useQuery({
    queryKey: ["getLogedInUserInfo"],
    queryFn: getLogedInUserInfo,
  });
};

export const useUsersData = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useAddUserData = () => {
  return useMutation({ mutationFn: addUser });
};
