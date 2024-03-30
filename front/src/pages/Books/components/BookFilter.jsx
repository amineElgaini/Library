import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

function BookFilter({ setFilter, pagination }) {
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    page: 1,
  });
  useEffect(() => {
    setFilter({
      page: filters.page,
      "title[like]": filters.title,
      "genre[like]": filters.genre,
    });
  }, [filters]);
  return (
    <div className="flex gap-4">
      <Input
        className="w-[200px]"
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
        className="w-[200px]"
        name="title"
        value={filters.title}
        onChange={(e) =>
          setFilters((p) => {
            return { ...p, title: e.target.value };
          })
        }
        placeholder="title"
      ></Input>

      <Pagination className={"ms-auto"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (pagination?.current_page !== 1) {
                  setFilters((p) => {
                    return { ...p, page: pagination?.current_page - 1 };
                  });
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (pagination?.current_page !== pagination?.last_page) {
                  setFilters((p) => {
                    return { ...p, page: pagination?.current_page + 1 };
                  });
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default BookFilter;
