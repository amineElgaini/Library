import { useBorrowingRecordsData } from "@/hooks/useBooks";

import BorrowingRecrodsTable from "./component/BorrowingRecrodsTable";

function BorrowingRecords() {
  // const [filter, setFilter] = useState({});

  // const [filters, setFilters] = useState({
  //   bookId: -1,
  //   userId: -1,
  //   borrowingDate: -1,
  //   dueDate: -1,
  //   actualReturnDate: -1,
  // });

  const { data, isError } = useBorrowingRecordsData({ includeFine: true });
  // useEffect(() => {
  //   setFilter({
  //     page: filters.page,
  //     "title[eq]": filters.title,
  //     "genre[eq]": filters.genre,
  //   });
  // }, [filters]);

  return (
    <div className="container">
      <div className="flex gap-4 flex-wrap justify-center">
        {isError && "error"}

        {data?.data?.data !== undefined && (
          <BorrowingRecrodsTable borrowingRecords={data?.data?.data} />
        )}
      </div>
    </div>
  );
}

export default BorrowingRecords;
