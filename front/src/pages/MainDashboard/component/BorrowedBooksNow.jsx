import { Doughnut } from "react-chartjs-2";


function BorrowedBooksNow() {
  const data = {
    labels: ["Not Availble", "Availble"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 3],
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
      <h1 className="text-2xl font-semibold text-center mb-2">
        Borrowed Books Now
      </h1>
      <Doughnut data={data} config={config} />
    </div>
  );
}

export default BorrowedBooksNow;
