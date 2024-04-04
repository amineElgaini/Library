import { useState } from "react";
import { useBooksData } from "@/hooks/useBook";
import BookCard from "./components/BookCard";
import CardLoading from "./components/CardLoading";
import BookFilter from "./components/BookFilter";
function Books() {
  const [filter, setFilter] = useState({
    page: 1,
    "title[like]": "",
    "genre[like]": "",
  });
  const { data, isLoading, isError } = useBooksData(filter);

  return (
    <div className="container">
      <BookFilter filter={filter} setFilter={setFilter} pagination={data?.data} />
      <div className="flex gap-4 flex-wrap justify-center">
        {isError && "Error accured while displaying books"}

        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, index) => <CardLoading key={index} />)}

        {data?.data.data &&
          data?.data.data.map((book) => {
            return <BookCard key={book.bookId} book={book} />;
          })}
      </div>
    </div>
  );
}

export default Books;
