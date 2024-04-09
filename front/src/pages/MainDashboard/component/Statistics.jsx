import { useStatisticsData } from "@/hooks/reactQuery/useStatistics";
import CountCard from "./CountCard";

function Statistics() {
  const { data, isLoading } = useStatisticsData();

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CountCard title={"Total Users"} data={data?.data?.usersCount} />
          <CountCard
            title={"Total Of Not Paid Books"}
            data={data?.data?.borrowedBooksNotPaidCount}
          />
          <CountCard title={"Late Books"} data={data?.data?.lateBooksCount} />
          <CountCard title={"Total Books"} data={data?.data?.booksCount} />
        </div>
      )}
    </>
  );
}

export default Statistics;
