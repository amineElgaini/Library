import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetUserByName } from "@/hooks/reactQuery/useUsers";
import { useBorrowBook } from "@/hooks/reactQuery/useBorrowing";
import { Loader2 } from "lucide-react";

function BorrowBookButton({ bookId }) {
  const [username, setUsername] = useState("");
  const { data: user, isLoading } = useGetUserByName(username);
  const { mutate: borrowBook } = useBorrowBook();

  const handleBorrow = () => {
    borrowBook({
      userId: user?.data?.data?.id,
      bookId: bookId,
      borrowingDays: 3,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant={"blue"}>
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a User To Borrow Book [ {bookId} ]</DialogTitle>
          <DialogDescription className="flex flex-col">
            <div className="mx-auto mt-4 flex justify-center w-full max-w-sm items-center space-x-2">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
              <DialogClose
                className=""
                disabled={user?.data?.data?.id === undefined}
              >
                <Button
                  onClick={() => {
                    handleBorrow();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}
                  Borrow
                </Button>
              </DialogClose>
            </div>

            <div className="mt-2 border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.data?.data?.username}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">User Id</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.data?.data?.id}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.data?.data?.email}
                  </dd>
                </div>
              </dl>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default BorrowBookButton;
