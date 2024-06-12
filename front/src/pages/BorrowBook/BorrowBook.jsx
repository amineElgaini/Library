import { useBooksData } from "@/hooks/reactQuery/useBooks";
import { useState } from "react";
import BooksTable from "./component/BooksTable";
import BookFilter from "../Books/components/BookFilter";
import AddBook from "../manageBooks/component/AddBook";

function BorrowBook() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "categoryId[eq]": "",
  });

  const { data, isError, isLoading } = useBooksData(filter);

  return (
    <div className="container">
      <BookFilter
        filter={filter}
        setFilter={setFilter}
        pagination={data?.data}
      />
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {isError && "error"}
        {isLoading ? "laoding..." : <BooksTable books={data?.data?.data} />}
      </div>
    </div>
  );
}

export default BorrowBook;
