import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

function BorrowingRecordsFilter({ setFilter, pagination }) {
  const [filters, setFilters] = useState({
    page: 1,
    includeFine: true,
  });

  useEffect(() => {
    setFilter({
      page: filters.page,
      includeFine: true,
    });
  }, [filters]);
  return (
    <div className="flex gap-2 mb-4 items-center flex-wrap">
      <Pagination setFilters={setFilters} pagination={pagination} />
    </div>
  );
}

export default BorrowingRecordsFilter;
