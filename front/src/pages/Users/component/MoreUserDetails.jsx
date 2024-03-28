import { useState } from "react";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUser } from "@/hooks/useUsers";
function MoreUserDetails({ user }) {
  const [userId, setUserId] = useState();
  const { data: moreUserInfo } = useGetUser(userId);

  return (
    <Dialog>
      <DialogTrigger onClick={() => setUserId(user.id)}>
        <EyeOpenIcon className="text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User [ {user.id} ] Info:</DialogTitle>
          <DialogDescription className="text-left">
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MoreUserDetails;
