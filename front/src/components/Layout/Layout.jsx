import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/context/useAuth";

import { useGetLogedInUserInfo } from "@/hooks/reactQuery/useAuth";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ResponsiveNavbar from "./BurgarNavbar";
import ProfileDropDown from "./ProfileDropDown";
import { ModeToggle } from "../mode-toggle";
import { toast } from "sonner";
import Spinner from "../Spinner";

const links = {
  books: {
    path: "/books",
    name: "Books",
  },
  usersDashboard: {
    path: "/users",
    name: "Users",
  },
  borrowBookDashboard: {
    path: "/borrowBook",
    name: "Borrow Books",
  },
  borrowingRecordsDashboard: {
    path: "/borrowingRecords",
    name: "Borrowing Records",
  },
  manageBooksDashboard: {
    path: "/manageBooks",
    name: "Manage Books",
  },
  mainDashboard: {
    path: "/mainDashboard",
    name: "Main Dashboard",
  },
};


function Layout() {
  const { auth, setAuth } = useAuth();
  const [isFetchingAuth, setIsFetchingAuth] = useState(true);
  const { data, isLoading, isSuccess } = useGetLogedInUserInfo();
  useEffect(() => {
    if (!isLoading) {
      setIsFetchingAuth(false);
    }

    if ((!isLoading, isSuccess)) {
      setAuth({ roles: data.data.roles, username: data.data.username });
      if (localStorage.getItem("SayWelcomeMessage") === "yes") {
        toast(`Welcome ${data.data.username} To The Libarary`);
        localStorage.removeItem("SayWelcomeMessage");
      }
    }
  }, [isLoading]);

  return (
    <>
      {isFetchingAuth ? (
        <>
          <Spinner/>
        </>
      ) : (
        <>
          <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
              <Navbar links={links} auth={auth} />
              <ResponsiveNavbar links={links} auth={auth} />

              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <span className="ml-auto"></span>
                {auth?.username !== undefined ? (
                  <ProfileDropDown />
                ) : (
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                )}
                <ModeToggle />
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default Layout;
