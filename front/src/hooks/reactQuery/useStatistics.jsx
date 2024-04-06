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

const fetchTopThreeBooks = () => {
  return request({ url: "/statistics/topThreeBooks" });
};

export const useTopThreeBooks = () => {
  return useQuery({
    queryKey: ["statistics/topThreeBooks"],
    queryFn: fetchTopThreeBooks,
  });
};
