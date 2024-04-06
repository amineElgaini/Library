import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const returnBorrowedBook = ({ borrowId }) => {
  return request({
    url: `/borrowingRecords/returnBorrowedBook/${borrowId}`,
    method: "post",
  });
};

export const useReturnBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: returnBorrowedBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Returned Succefuly");
      queryClient.refetchQueries({ queryKey: ["borrowingRecordsData"] });
    },
  });
};

const payBorrowedBook = ({ borrowId }) => {
  return request({
    url: `/borrowingRecords/payBorrowedBook/${borrowId}`,
    method: "post",
  });
};

export const usePayBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payBorrowedBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Paid Succefuly");
      queryClient.refetchQueries({ queryKey: ["borrowingRecordsData"] });
    },
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

const borrowBook = (borrowInfo) => {
  return request({
    url: "/borrowingRecords",
    method: "post",
    data: borrowInfo,
  });
};

export const useBorrowBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: borrowBook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Book Borrowed Succefuly");
      queryClient.refetchQueries({ queryKey: ["books"] });
    },
  });
};
