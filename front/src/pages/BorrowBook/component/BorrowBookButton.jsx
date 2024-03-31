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
import { useBorrowBook } from "@/hooks/useBorrow";

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
        <Button size="sm" variant={"blue"}>
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a User To Borrow Book [ {bookId} ]</DialogTitle>
          <DialogDescription className="flex flex-col ">
            <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input
                onChange={(e) => setUserId(e.target.value)}
                type="number"
                placeholder="User"
              />
              <Button size={"sm"} onClick={() => refetch()}>
                Find
              </Button>
              <DialogClose
                className=""
                disabled={user?.data?.data.id === undefined}
              >
                <Button
                  variant="green"
                  disabled={user?.data?.data.id === undefined}
                  onClick={() => {
                    handleBorrow();
                  }}
                  size="sm"
                >
                  Borrow
                </Button>
              </DialogClose>
            </div>
            <div className="mt-2">
              <p>UserId: {user?.data?.data.id}</p>
              <p>UserEmail: {user?.data?.data.email}</p>
              <p>UserName: {user?.data?.data.username}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default BorrowBookButton;
