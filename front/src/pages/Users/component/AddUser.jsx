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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  const { mutate, isPending } = useAddUserData();

  const handleSubmit = () => {
    if (error.password === "") {
      mutate({ name, email, password });
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
        <Button size="sm" className="flex gap-1">
          Create A User
          <Pencil1Icon width={20} height={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a user</DialogTitle>
          <DialogDescription>You will add a new user.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
