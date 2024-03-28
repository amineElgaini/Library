import { useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUser } from "@/hooks/useUsers";
import LoadinLodingSpinner from "@/components/LodingSpinner";

function MoreUserDetails({ user }) {
  const [userId, setUserId] = useState();
  const { data: moreUserInfo, isLoading } = useGetUser(userId);

  return (
    <Dialog>
      <DialogTrigger
        className="hover:bg-green-500/40 duration-300 transition rounded-full p-2 text-green-500 cursor-pointer"
        onClick={() => setUserId(user.id)}
      >
        <PersonIcon width={19} height={19} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User [ {user.id} ] Info:</DialogTitle>
          <DialogDescription className="flex justify-between items-end">
            <div className="text-left">
              <div>Name: {moreUserInfo?.data?.data.name}</div>
              <div>Name: {moreUserInfo?.data?.data.email}</div>
              <div>
                Total Borrowed Books:{" "}
                {moreUserInfo?.data?.data.howManyBorrowedBooks}
              </div>
              <div>
                Total Book Still Borrowed Books:{" "}
                {moreUserInfo?.data?.data.howManyStillBorrowedBooks}
              </div>
            </div>
            <LoadinLodingSpinner isLoading={isLoading} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MoreUserDetails;
