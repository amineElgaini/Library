import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsersData } from "@/hooks/useUsers";

import EditUser from "./component/EditUser";
import MoreUserDetails from "./component/MoreUserDetails";
import DeleteUser from "./component/DeleteUser";

import AddUser from "./component/AddUser";

function Users() {
  const { data } = useUsersData();

  return (
    <div className="container">
      <AddUser/>
      <Table className="mx-auto">
        <TableCaption>Table Of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.data !== undefined &&
            data?.data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell className="flex items-center gap-3">
                  <MoreUserDetails user={user} />
                  - <EditUser user={user} /> - <DeleteUser user={user} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
