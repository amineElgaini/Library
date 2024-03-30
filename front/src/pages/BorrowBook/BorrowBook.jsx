import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useBooksData } from "@/hooks/useBook";
import { useEffect, useState } from "react";
import BooksTable from "./component/BooksTable";

function BorrowBook() {
  const [filter, setFilter] = useState({});

  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    page: 1,
  });

  const { data, isError } = useBooksData(filter);

  useEffect(() => {
    setFilter({
      page: filters.page,
      "title[eq]": filters.title,
      "genre[eq]": filters.genre,
    });
  }, [filters]);

  return (
    <div className="container">
      <div className="my-4 flex gap-4 max-w-md mx-auto">
        <Input
          name="genre"
          value={filters.genre}
          onChange={(e) =>
            setFilters((p) => {
              return { ...p, genre: e.target.value };
            })
          }
          placeholder="genre"
        ></Input>

        <Input
          name="title"
          value={filters.title}
          onChange={(e) =>
            setFilters((p) => {
              return { ...p, title: e.target.value };
            })
          }
          placeholder="title"
        ></Input>

        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            className="p-2"
            disabled={data?.data?.current_page === 1}
            onClick={() =>
              setFilters((p) => {
                return { ...p, page: data?.data?.current_page - 1 };
              })
            }
          >
            {" "}
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 4L9 11L4.5 7.5L9 4Z" fill="currentColor"></path>
            </svg>{" "}
          </Button>
          <Button
            size="sm"
            className="p-2"
            disabled={data?.data?.last_page === data?.data?.current_page}
            onClick={() => {
              setFilters((p) => {
                return { ...p, page: data?.data?.current_page + 1 };
              });
            }}
          >
            {" "}
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path>
            </svg>{" "}
          </Button>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {isError && "error"}

        {data?.data?.data !== undefined && (
          <BooksTable books={data?.data?.data} />
        )}
      </div>
    </div>
  );
}

export default BorrowBook;
