import { useState } from "react";
import { useBooksData } from "@/hooks/reactQuery/useBooks";
import BookCard from "./components/BookCard";
import BookLoadingCard from "./components/BookLoadingCard";
import BookFilter from "./components/BookFilter";

function Books() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "genre[like]": "",
  });
  const { data, isLoading, isSuccess, isError } = useBooksData(filter);
  return (
    <div className="container">
      <BookFilter
        filter={filter}
        setFilter={setFilter}
        pagination={data?.data}
      />

      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {isError && "Error Accrued while displaying books"}
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, index) => <BookLoadingCard key={index} />)}
        {!isLoading &&
          isSuccess &&
          data?.data.data.map((book) => {
            return <BookCard key={book.bookId} book={book} />;
          })}
      </div>
    </div>
  );
}

export default Books;
