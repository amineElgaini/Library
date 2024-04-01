import Pagination from "@/components/Pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
function BorrowingRecordsFilter({ filter, setFilter, pagination }) {
  return (
    <div className="flex justify-between gap-2 mb-4 items-center flex-wrap">
      <div className="flex gap-2">
        <Input
          placeholder="username"
          value={filter["username[eq]"]}
          onChange={(e) => {
            setFilter((p) => {
              return { ...p, page: 1, "username[eq]": e.target.value };
            });
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filter.paid}
              onCheckedChange={() => {
                setFilter((p) => {
                  return { ...p, page: 1, paid: !p.paid };
                });
              }}
            >
              Paid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter.notPaid}
              onCheckedChange={() => {
                setFilter((p) => {
                  return { ...p, page: 1, notPaid: !p.notPaid };
                });
              }}
            >
              NotPaid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter.late}
              onCheckedChange={() => {
                setFilter((p) => {
                  return { ...p, page: 1, late: !p.late };
                });
              }}
            >
              Late
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter.borrow}
              onCheckedChange={() => {
                setFilter((p) => {
                  return { ...p, page: 1, borrow: !p.borrow };
                });
              }}
            >
              Borrow
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Pagination setFilters={setFilter} pagination={pagination} />
    </div>
  );
}

export default BorrowingRecordsFilter;
