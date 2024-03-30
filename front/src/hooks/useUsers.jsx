import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";
import { toast } from "sonner";

const fetchUser = ({ queryKey }) => {
  return request({ url: `/users/${queryKey[1]}` });
};

const fetchUsers = ({ queryKey }) => {
  return request({ url: "/users", params: queryKey[1] });
};

const deleteUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: "delete",
  });
};

const updateUser = (user) => {
  return request({ url: `/users/${user.id}`, method: "patch", data: user });
};

const addUser = (user) => {
  return request({ url: "/users", method: "post", data: user });
};

const getLogedInUserInfo = () => {
  return request({ url: "/getLogedInUserInfo" });
};

export const useEditUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("User Updated Succefuly"),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("User Is Deleted Succefuly"),
  });
};

export const useGetUser = (id, enabled = true) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: fetchUser,
    enabled: enabled,
  });
};

export const useGetLogedInUserInfo = () => {
  return useQuery({
    queryKey: ["getLogedInUserInfo"],
    queryFn: getLogedInUserInfo,
  });
};

export const useUsersData = (filter) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: fetchUsers,
  });
};

export const useAddUserData = () => {
  return useMutation({
    mutationFn: addUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("User Added Succefuly"),
  });
};
