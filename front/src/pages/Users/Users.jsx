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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

function Users() {
  const [filter, setFilter] = useState({ page: 1 });
  const [filters, setFilters] = useState({
    username: "",
    page: 1,
  });
  const { data } = useUsersData(filter);

  useEffect(() => {
    setFilter({
      page: filters.page,
      "username[like]": filters.username,
    });
  }, [filters]);

  return (
    <div className="container">
      <AddUser />
      <div className="flex mt-2">
        <Input
          placeholder="userName"
          onChange={(e) => {
            setFilters((p) => {
              return { ...p, username: e.target.value };
            });
          }}
        />
        <Pagination className={"justify-end"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (data?.data?.meta.current_page !== 1) {
                    setFilters((p) => {
                      return { ...p, page: data?.data?.meta.current_page - 1 };
                    });
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (
                    data?.data?.meta.current_page !== data?.data?.meta.last_page
                  ) {
                    setFilters((p) => {
                      return { ...p, page: data?.data?.meta.current_page + 1 };
                    });
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
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
          {data?.data?.data !== undefined &&
            data?.data?.data.map((user) => (
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
    </div>
  );
}

export default Users;
