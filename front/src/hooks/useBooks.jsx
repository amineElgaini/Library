import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";

const fetchUsers = ({ queryKey }) => {
  const params = queryKey[1];
  return request({ url: "/books", params});
};

// const addUser = (user) => {
//   return request({ url: "/users", method: "post", data: user });
// };

// const getLogedInUserInfo = () => {
//   return request({ url: "/getLogedInUserInfo" });
// };

// export const useGetLogedInUserInfo = () => {
//   return useQuery({
//     queryKey: ["getLogedInUserInfo"],
//     queryFn: getLogedInUserInfo,
//   });
// };

export const useBooksData = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: fetchUsers,
  });
};

// export const useAddUserData = () => {
//   return useMutation({ mutationFn: addUser });
// };
