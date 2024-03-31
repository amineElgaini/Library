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
import { useGetUserByName } from "@/hooks/useUsers";
import { useBorrowBook } from "@/hooks/useBorrow";
import LoadinLodingSpinner from "@/components/LodingSpinner";

function BorrowBookButton({ bookId }) {
  const [username, setUsername] = useState("");
  const { data: user, isLoading } = useGetUserByName(username);
console.log(user?.data?.data?.id)
  const { mutate } = useBorrowBook();
  const handleBorrow = () => {
    mutate({
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
            <div className="mt-4 flex justify-center w-full max-w-sm items-center space-x-2">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Usernae"
              />
              <DialogClose
                className=""
                disabled={user?.data?.data?.id === undefined}
              >
                <Button
                  variant="green"
                  disabled={user?.data?.data?.id === undefined}
                  onClick={() => {
                    handleBorrow();
                  }}
                  size="sm"
                >
                  Borrow
                </Button>
              </DialogClose>
            </div>
            <div className="flex justify-between items-end">
              <div className="mt-2 text-left text-base">
                <p>
                  <span className="dark:text-white text-black font-bold mr-2">
                    UserId:
                  </span>{" "}
                  {user?.data?.data?.id}
                </p>
                <p>
                  <span className="dark:text-white text-black font-bold mr-2">
                    UserEmail:
                  </span>{" "}
                  {user?.data?.data?.email}
                </p>
                <p>
                  <span className="dark:text-white text-black font-bold mr-2">
                    UserName:
                  </span>{" "}
                  {user?.data?.data?.username}
                </p>
              </div>
              <LoadinLodingSpinner isLoading={isLoading} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default BorrowBookButton;
