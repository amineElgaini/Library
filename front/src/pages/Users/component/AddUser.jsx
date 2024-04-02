import { useEffect, useState } from "react";
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
import { useAddUserData } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";
function AddUser() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  const { mutate, isPending } = useAddUserData();

  const handleSubmit = () => {
    if (error.password === "") {
      mutate({ username, email, password });
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setError((p) => {
        return { ...p, password: "faild password confirmation" };
      });
    } else {
      setError((p) => {
        return { ...p, password: "" };
      });
    }
  }, [confirmPassword, password]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex gap-2">
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
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a user</DialogTitle>
          <DialogDescription>You will add a new user.</DialogDescription>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              type={"password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ConfirmPassword" className="text-right">
              Password Confirmation
            </Label>
            <div className="col-span-3 w-full">
              <Input
                type={"password"}
                id="ConfirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="col-span-3 w-full"
              />
              <small className="mx-auto whitespace-nowrap text-red-500">
                {error.password}
              </small>
            </div>
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

export default AddUser;
