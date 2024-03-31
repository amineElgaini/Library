import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditUser from "./EditUser";
import MoreUserDetails from "./MoreUserDetails";
import DeleteUser from "./DeleteUser";

function UsersTable({ users }) {
  return (
    <>
      <Table className="mx-auto">
        <TableCaption>Table Of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users !== undefined &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell className="flex items-center gap-3">
                  <MoreUserDetails user={user} />
                  - <EditUser user={user} /> - <DeleteUser user={user} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default UsersTable;
