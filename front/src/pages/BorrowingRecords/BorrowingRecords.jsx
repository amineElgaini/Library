import { useBorrowingRecordsData } from "@/hooks/reactQuery/useBorrowing";

import BorrowingRecrodsTable from "./component/BorrowingRecrodsTable";
import { useState } from "react";
import BorrowingRecordsFilter from "./component/BorrowingRecordsFilter";

function BorrowingRecords() {
  const [filter, setFilter] = useState({
    page: 1,
    includeFine: true,
    "borrowingDate[gte]": "",
    "borrowingDate[lte]": "",
    "dueDate[gte]": "",
    "dueDate[lte]": "",
    "username[eq]": "",
    notPaid: false,
    borrowed: false,
    late: false,
    paid: false,
  });
  const { data, isLoading, isError } = useBorrowingRecordsData(filter);
  return (
    <div className="container">
      <BorrowingRecordsFilter
        filter={filter}
        setFilter={setFilter}
        pagination={data?.data}
      />
      {isError && "Error Accrued While Displaying Borrowing Records"}
      {isLoading ? (
        "loading..."
      ) : (
        <BorrowingRecrodsTable borrowingRecords={data?.data?.data} />
      )}
    </div>
  );
}

export default BorrowingRecords;
