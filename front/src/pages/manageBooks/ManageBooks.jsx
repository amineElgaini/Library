import { useBooksData } from "@/hooks/reactQuery/useBooks";
import BooksTable from "./component/BooksTable";
import BookFilter from "../Books/components/BookFilter";
import { useState } from "react";
import AddBook from "./component/AddBook";
import AddCopy from "./component/AddCopy";

function ManageBooks() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "genre[like]": "",
  });
  const { data, isError, isLoading } = useBooksData(filter);

  return (
    <>
      <div className="container">
        <div className="flex gap-2 items-start">
          <AddBook />
          <AddCopy />
          <div className="flex-1">
            <BookFilter
              filter={filter}
              setFilter={setFilter}
              pagination={data?.data}
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {isError && "error"}
          {isLoading ? "laoding..." : <BooksTable books={data?.data?.data} />}
        </div>
      </div>
    </>
  );
}

export default ManageBooks;
