import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

function DateFilter({ setFilter }) {
  const [borrowingDate, setBorrowingDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [borrowingDateBy, setBorrowingDateBy] = useState("[gte]");
  const [dueDateBy, setDueDateBy] = useState("[gte]");

  useEffect(() => {
    setFilter((p) => {
      return {
        ...p,
        [`borrowingDate[lte]`]: "",
        [`borrowingDate[gte]`]: "",

        [`dueDate[lte]`]: "",
        [`dueDate[gte]`]: "",

        // overide after reset
        [`borrowingDate${borrowingDateBy}`]: borrowingDate,
        [`dueDate${dueDateBy}`]: dueDate,
      };
    });
  }, [borrowingDateBy, dueDateBy, borrowingDate, dueDate]);
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <div>
          <Label>Borrowing Date</Label>
          <br />
          <div className="flex">
            <Select
              value={borrowingDateBy}
              onValueChange={(value) => setBorrowingDateBy(value)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Filter</SelectLabel> */}
                  <SelectItem value="[gte]">Greater</SelectItem>
                  <SelectItem value="[lte]">Less</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !borrowingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {borrowingDate ? (
                    format(borrowingDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={borrowingDate}
                  onSelect={setBorrowingDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label>Due Date</Label>
          <br />
          <div className="flex">
            <Select
              value={dueDateBy}
              onValueChange={(value) => setDueDateBy(value)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Filter</SelectLabel> */}
                  <SelectItem value="[gte]">Greater</SelectItem>
                  <SelectItem value="[lte]">Less</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateFilter;
