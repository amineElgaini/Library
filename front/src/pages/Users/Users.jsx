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

function Users() {
  const { data } = useUsersData();

  return (
    <div className="container">
      <Table className="mx-auto">
        <TableCaption>Table Of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.data !== undefined &&
            data?.data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>

                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
