import React, { useState } from "react";
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
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEditUser } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";
function EditUser({ user = {} }) {
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const { mutate, isPending } = useEditUser();

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-blue-500/40 duration-300 transition rounded-full p-1 text-blue-500 cursor-pointer">
        <Pencil1Icon
          width={19}
          height={19}
          className="text-blue-500  cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              userName
            </Label>
            <Input
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              mutate({ id: user.id, username, email });
            }}
            disabled={isPending ? true : false}
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditUser;
