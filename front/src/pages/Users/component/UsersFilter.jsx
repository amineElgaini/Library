import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function UsersFilter({ setFilter, pagination }) {
  const [filters, setFilters] = useState({
    username: "",
    page: 1,
  });
  useEffect(() => {
    setFilter({
      "username[like]": filters.username,
      page: filters.page,
    });
  }, [filters]);
  return (
    <div className="flex items-center justify-between mt-2">
      <Input
        className="w-[200px]"
        placeholder="userName"
        onChange={(e) => {
          setFilters((p) => {
            return { ...p, username: e.target.value };
          });
        }}
      />
      <Pagination setFilters={setFilters} pagination={pagination} />
    </div>
  );
}

export default UsersFilter;
