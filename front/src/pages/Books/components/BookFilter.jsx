import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
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
    <div className="flex justify-center gap-2 mb-4 items-center flex-wrap">
      <Input
        className="w-[120px]"
        name="genre"
        value={filters.genre}
        onChange={(e) =>
          setFilters((p) => {
            return { ...p, genre: e.target.value };
          })
        }
        placeholder="genre"
      />

      <Input
        className="w-[120px]"
        name="title"
        value={filters.title}
        onChange={(e) =>
          setFilters((p) => {
            return { ...p, title: e.target.value };
          })
        }
        placeholder="title"
      />

      <Pagination setFilters={setFilters} pagination={pagination} />
    </div>
  );
}

export default BookFilter;
