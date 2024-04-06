import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// fetch
const fetchBooks = ({ queryKey }) => {
  const params = queryKey[1];
  return request({ url: "/books", params });
};

export const useBooksData = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: fetchBooks,
  });
};

// create
const addBook = (book) => {
  return request({ url: "/books", method: "post", data: book });
};

export const useAddBookData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Added Succefuly"),
        queryClient.refetchQueries({ queryKey: ["borrowingRecordsData"] });
    },
  });
};

// update
const updateBook = (book) => {
  return request({ url: `/books/${book.id}`, method: "patch", data: book });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Updated Succefuly"),
        queryClient.refetchQueries({ queryKey: ["books"] });
    },
  });
};

// delete
const deleteUser = (id) => {
  return request({
    url: `/books/${id}`,
    method: "delete",
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Is Deleted Succefuly"),
        queryClient.refetchQueries({ queryKey: ["books"] });
    },
  });
};
