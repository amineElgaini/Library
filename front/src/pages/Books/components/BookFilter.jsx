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
// import AddBook from "@/pages/manageBooks/component/AddBook";
import { useCategoriesData } from "@/hooks/reactQuery/useCategories";

function BookFilter({ filter, setFilter, pagination }) {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
  } = useCategoriesData();
  return (
    <div className="flex justify-between gap-2 items-center flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <Select
          value={filter["categoryId[eq]"]}
          onValueChange={(v) => {
            setFilter((p) => {
              return { ...p, ["categoryId[eq]"]: v === "0" ? "" : v };
            });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="0">All</SelectItem>
              {categories?.data?.data.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
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
