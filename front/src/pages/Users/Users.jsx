import { useUsersData } from "@/hooks/useUsers";

import AddUser from "./component/AddUser";
import { useState } from "react";
import UsersTable from "./component/UsersTable";
import UsersFilter from "./component/UsersFilter";

function Users() {
  const [filter, setFilter] = useState({
    page: 1,
    "username[like]": "",
  });

  const { data, isLoading } = useUsersData(filter);

  return (
    <div className="container">
      
      <UsersFilter setFilter={setFilter} pagination={data?.data?.meta} />
      {isLoading ? "loading..." : <UsersTable users={data?.data?.data} />}
    </div>
  );
}

export default Users;
