import { useBorrowingRecordsData } from "@/hooks/useBorrow";

import BorrowingRecrodsTable from "./component/BorrowingRecrodsTable";
import { useState } from "react";
import BorrowingRecordsFilter from "./component/BorrowingRecordsFilter";

function BorrowingRecords() {
  const [filter, setFilter] = useState({
    page: 1,
    includeFine: true,
    "username[eq]": "",
    notPaid: false,
    borrow: false,
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
      {isError && "error accured while displaying borrowing records"}
      {isLoading ? (
        "loading..."
      ) : (
        <BorrowingRecrodsTable borrowingRecords={data?.data?.data} />
      )}
    </div>
  );
}

export default BorrowingRecords;
