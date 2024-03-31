import { useBooksData } from "@/hooks/useBook";
import { useState } from "react";
import BooksTable from "./component/BooksTable";
import BookFilter from "../Books/components/BookFilter";

function BorrowBook() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "genre[like]": "",
  });
  const { data, isError, isLoading } = useBooksData(filter);

  return (
    <div className="container">
      <BookFilter setFilter={setFilter} pagination={data?.data} />
      <div className="flex gap-4 flex-wrap justify-center">
        {isError && "error"}
        {isLoading ? "laoding..." : <BooksTable books={data?.data?.data} />}
      </div>
    </div>
  );
}

export default BorrowBook;
