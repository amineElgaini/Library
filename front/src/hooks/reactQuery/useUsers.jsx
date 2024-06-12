import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";
import { toast } from "sonner";

const findByUsername = ({ queryKey }) => {
  return request({ url: `/users/findByUsername/${queryKey[1]}` });
};

export const useGetUserByName = (username) => {
  return useQuery({
    queryKey: ["users/findByUsername", username],
    queryFn: findByUsername,
  });
};

const fetchUser = ({ queryKey }) => {
  return request({ url: `/users/${queryKey[1]}` });
};

export const useGetUser = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: fetchUser,
  });
};

const fetchUsers = ({ queryKey }) => {
  return request({ url: "/users", params: queryKey[1] });
};

export const useUsersData = (filter) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: fetchUsers,
  });
};

const deleteUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: "delete",
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("User Is Deleted Succefuly"),
        queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });
};

const updateUser = (user) => {
  return request({ url: `/users/${user.id}`, method: "patch", data: user });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("User Updated Succefuly"),
        queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });
};

const addUser = (user) => {
  return request({ url: "/users", method: "post", data: user });
};

export const useAddUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
        toast.success("User Added Succefuly"),
        queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });
};