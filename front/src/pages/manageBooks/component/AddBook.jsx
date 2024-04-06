import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAddBookData } from "@/hooks/reactQuery/useManageBooks";
function AddBook() {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const { mutate, isPending } = useAddBookData();

  const handleSubmit = () => {
    mutate({ ISBN, title, genre, publicationDate, additionalDetails });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"w-[40px] p-1"} size="sm">
          <img className="w-[25px]" src="./addBook.png" alt="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add A Book</DialogTitle>
          <DialogDescription>You will add a new book.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input
              id="isbn"
              onChange={(e) => setISBN(e.target.value)}
              value={ISBN}
              className="col-span-3"
              placeholder="ISBN"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="col-span-3"
              placeholder="Title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">
              Genre
            </Label>
            <Input
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className="col-span-3"
              placeholder="Genre"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className={"whitespace-nowrap"}>Publicated At</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !publicationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {publicationDate ? (
                    format(publicationDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publicationDate}
                  onSelect={setPublicationDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">
              Genre
            </Label>
            <Textarea
              className="col-span-3"
              placeholder="Type your message here."
              id="message"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending ? true : false}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBook;
