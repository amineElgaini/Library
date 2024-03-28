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
import { useGetUser } from "@/hooks/useUsers";
import { useBorrowBook } from "@/hooks/useBooks";

function BorrowBookButton({ bookId }) {
  const [userId, setUserId] = useState(-1);
  const { data: user, refetch } = useGetUser(userId, false);

  const { mutate } = useBorrowBook();
  const handleBorrow = () => {
    mutate({
      userId: userId,
      bookId: bookId,
      borrowingDays: 3,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Borrow
        </button>{" "}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a User To Borrow Book [ {bookId} ]</DialogTitle>
          <DialogDescription>
            <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input
                onChange={(e) => setUserId(e.target.value)}
                type="number"
                placeholder="User"
              />
              <Button onClick={() => refetch()}>Find</Button>
            </div>
            <div className="mt-2">
              <h6>UserId: {user?.data?.data.id}</h6>
              <p>UserEmail: {user?.data?.data.email}</p>
              <p>UserName: {user?.data?.data.name}</p>
            </div>
            <DialogClose /*  disabled={true} */>
              <Button
                onClick={() => {
                  handleBorrow();
                }}
                size="sm"
              >
                Borrow
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default BorrowBookButton;
