import { useBorrowedBooksCount } from "@/hooks/reactQuery/useStatistics";
import { Doughnut } from "react-chartjs-2";

function BorrowedBooksNow() {
  const { data: dataChart, isLoading } = useBorrowedBooksCount();

  const data = {
    labels: ["Available", "Borrowed"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          dataChart?.data?.bookCount - dataChart?.data?.borrowedBookCount,
          dataChart?.data?.borrowedBookCount,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
  };
  return (
    <div>
      <Doughnut data={data} config={config} />
      <h1 className="text-2xl font-semibold text-center mb-2">
        Borrowed Books Now
      </h1>
    </div>
  );
}

export default BorrowedBooksNow;
