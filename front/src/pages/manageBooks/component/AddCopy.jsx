import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAddCopyData, useBookData } from "@/hooks/reactQuery/useBooks";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/LoadingSpinner";
function AddCopy() {
  const [bookId, setBookId] = useState(-1);
  const { data: book, isLoading } = useBookData(bookId);
  const { mutate, isPending, data: newCopy } = useAddCopyData();
  console.log(isPending);
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant={"blue"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Copy
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a User To Borrow Book [ {bookId} ]</DialogTitle>
          <DialogDescription className="flex flex-col">
            <div className="mx-auto mt-4 flex justify-center w-full max-w-sm items-center space-x-2">
              <Input
                onChange={(e) => setBookId(e.target.value)}
                type="number"
                placeholder="Book Id"
              />
              <Button
                onClick={() => mutate(bookId)}
                disabled={isLoading || book?.data?.data?.id === undefined}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                Add Copy
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-4 items-start">
              <div className="w-full grid grid-cols-8 gap-4">
                <div className="col-span-2 text-left whitespace-nowrap">
                  Book Id:{" "}
                </div>
                <div className="text-left">{book?.data?.data?.id}</div>
              </div>
              <Separator />
              <div className="w-full grid grid-cols-8 gap-4">
                <div className="col-span-2 text-left whitespace-nowrap">
                  Book Title:{" "}
                </div>
                <div className="text-left">{book?.data?.data?.title}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <span>
                {newCopy?.data?.id ? (
                  <span className="text-green-600 border-2 border-green-600 p-1 rounded-lg">
                    New Copy Id: {newCopy?.data?.id}
                  </span>
                ) : isPending ? (
                  <LoadingSpinner isLoading={isPending} />
                ) : (
                  "???"
                )}
              </span>{" "}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddCopy;
