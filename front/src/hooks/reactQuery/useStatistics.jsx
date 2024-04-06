import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/axios-utils";

const fetchStatistics = () => {
  return request({ url: "/statistics"});
};

export const useStatisticsData = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });
};

