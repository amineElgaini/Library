import { useLastSevenDaysBorrows } from "@/hooks/reactQuery/useStatistics";
import { Bar } from "react-chartjs-2";

const BorrowedBooksLately = () => {
  const {
    data: chartData,
    isLoading,
  } = useLastSevenDaysBorrows();
  const data = {
    labels: chartData?.data?.data.map((e) => e.dayName),
    datasets: [
      {
        label: "Borrows",
        data: chartData?.data?.data.map((e) => e.borrows),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-2">
        Borrows In The Last Seven Days
      </h1>
      {isLoading ? "loading..." : <Bar data={data} />}
    </div>
  );
};

export default BorrowedBooksLately;
