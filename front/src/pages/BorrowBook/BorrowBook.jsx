import { useBooksData } from "@/hooks/reactQuery/useManageBooks";
import { useState } from "react";
import BooksTable from "./component/BooksTable";
import BookFilter from "../Books/components/BookFilter";
import AddBook from "../manageBooks/component/AddBook";

function BorrowBook() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "genre[like]": "",
  });
  const { data, isError, isLoading } = useBooksData(filter);

  return (
    <div className="container">
      <div className="flex gap-2 items-start">
        <AddBook />
        <div className="flex-1">
          <BookFilter
            filter={filter}
            setFilter={setFilter}
            pagination={data?.data}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {isError && "error"}
        {isLoading ? "laoding..." : <BooksTable books={data?.data?.data} />}
      </div>
    </div>
  );
}

export default BorrowBook;
