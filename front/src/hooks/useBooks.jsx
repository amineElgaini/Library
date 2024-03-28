import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";
import { toast } from "sonner";

const fetchUsers = ({ queryKey }) => {
  const params = queryKey[1];
  return request({ url: "/books", params });
};

const returnBorrowedBook = (borrowInfo) => {
  return request({
    url: "/borrowingRecords/returnBorrowedBook",
    method: "post",
    data: borrowInfo,
  });
};

const payBorrowedBook = (borrowInfo) => {
  return request({
    url: "/borrowingRecords/payBorrowedBook",
    method: "post",
    data: borrowInfo,
  });
};

const borrowBook = (borrowInfo) => {
  return request({
    url: "/borrowingRecords",
    method: "post",
    data: borrowInfo,
  });
};

const borrowingRecordsData = ({ queryKey }) => {
  const params = queryKey[1];
  return request({ url: "/borrowingRecords", params });
};

export const useBorrowingRecordsData = (filters) => {
  return useQuery({
    queryKey: ["borrowingRecordsData", filters],
    queryFn: borrowingRecordsData,
  });
};

export const useBooksData = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: fetchUsers,
  });
};

export const useReturnBorrowedBook = () => {
  return useMutation({
    mutationFn: returnBorrowedBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Book Returned Succefuly"),
  });
};
export const usePayBorrowedBook = () => {
  return useMutation({
    mutationFn: payBorrowedBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Book Paid Succefuly"),
  });
};
export const useBorrowBook = () => {
  return useMutation({
    mutationFn: borrowBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Book Borrowed Succefuly"),
  });
};
