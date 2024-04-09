import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddBook from "@/pages/manageBooks/component/AddBook";

function BookFilter({ filter, setFilter, pagination }) {
  return (
    <div className="flex justify-between gap-2 items-center flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <Select
          value={filter["genre[like]"]}
          onValueChange={(v) => {
            setFilter((p) => {
              return { ...p, ["genre[like]"]: v === "all" ? "" : v };
            });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="fun">Fun</SelectItem>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="self thought">Self Thought</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          className="w-[120px]"
          name="title"
          value={filter["title[like]"]}
          onChange={(e) =>
            setFilter((p) => {
              return { ...p, ["title[like]"]: e.target.value };
            })
          }
          placeholder="title"
        />
      </div>

      <Pagination setFilter={setFilter} pagination={pagination} />
    </div>
  );
}

export default BookFilter;
