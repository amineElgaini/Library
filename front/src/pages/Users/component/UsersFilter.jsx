import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";

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
      <div className="flex gap-2">
        <AddUser />
        <Input
          className="w-[200px]"
          placeholder="UserName"
          onChange={(e) => {
            setFilters((p) => {
              return { ...p, username: e.target.value };
            });
          }}
        />
      </div>

      <Pagination setFilters={setFilters} pagination={pagination} />
    </div>
  );
}

export default UsersFilter;
