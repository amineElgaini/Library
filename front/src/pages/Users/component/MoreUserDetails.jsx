import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUser } from "@/hooks/reactQuery/useUsers";
import LoadingSpinner from "@/components/LoadingSpinner";

function MoreUserDetails({ user }) {
  const [userId, setUserId] = useState();
  const { data: moreUserInfo, isLoading } = useGetUser(userId);

  return (
    <Dialog>
      <DialogTrigger
        className="hover:bg-green-500/40 duration-300 transition rounded-full p-1 text-green-500 cursor-pointer"
        onClick={() => {
          setUserId(user.id);
        }}
      >
        <span>
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User [ {user.id} ] Info:</DialogTitle>
          <DialogDescription className="flex justify-between items-end">
            <div className="text-left">
              <div>
                <span className="dark:text-white text-black font-bold mr-2">
                  username:
                </span>{" "}
                {moreUserInfo?.data?.data.username}
              </div>
              <div>
                <span className="dark:text-white text-black font-bold mr-2">
                  Email:
                </span>{" "}
                {moreUserInfo?.data?.data.email}
              </div>
              <div>
                <span className="dark:text-white text-black font-bold mr-2">
                  Total Borrowed Books:{" "}
                </span>
                {moreUserInfo?.data?.data.howManyBorrowedBooks}
              </div>
              <div>
                <span className="dark:text-white text-black font-bold mr-2">
                  Total Book Still Borrowed Books:
                </span>
                {moreUserInfo?.data?.data.howManyStillBorrowedBooks}
              </div>
            </div>
            <LoadingSpinner isLoading={isLoading} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MoreUserDetails;
