import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";

const fetchStatistics = () => {
  return request({ url: "/statistics" });
};

export const useStatisticsData = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });
};

const fetchTopBooks = () => {
  return request({ url: "/statistics/topBooks" });
};

export const useTopBooks = () => {
  return useQuery({
    queryKey: ["statistics/topBooks"],
    queryFn: fetchTopBooks,
  });
};

const fetchTopUsers = () => {
  return request({ url: "/statistics/topUsers" });
};

export const useTopUsers = () => {
  return useQuery({
    queryKey: ["statistics/topUsers"],
    queryFn: fetchTopUsers,
  });
};

const fetchLastSevenDaysBorrows = () => {
  return request({ url: "/statistics/lastSevenDaysBorrows" });
};

export const useLastSevenDaysBorrows = () => {
  return useQuery({
    queryKey: ["statistics/lastSevenDaysBorrows"],
    queryFn: fetchLastSevenDaysBorrows,
  });
};
