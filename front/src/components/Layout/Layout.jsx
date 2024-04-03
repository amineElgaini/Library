import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUser,
  LifeBuoy,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

import { Toaster } from "sonner";
import { useGetLogedInUserInfo } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ResponsiveNavbar from "./BurgarNavbar";

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

// admin: 4,

function Layout() {
  // this state rerender the component when the auth is set
  const [authFinished, setAuthFinished] = useState(false);

  const { auth, setAuth } = useAuth();
  const { data, isSuccess, isError, isLoading } = useGetLogedInUserInfo();

  // set the auth if exist and rerender after fetching is finished
  useEffect(() => {
    if (isSuccess) {
      setAuth({ roles: data.data.roles, username: data.data.username });
      setAuthFinished(true);
    } else if (isError) {
      setAuthFinished(true);
    }
  }, [isLoading]);
  return (
    <>
      {!authFinished ? (
        "loading..."
      ) : (
        <>
          <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
              <Navbar links={links} auth={auth} />

              <ResponsiveNavbar links={links} auth={auth} />

              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 6 te6t-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                </form>
                {auth?.username !== undefined ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                      >
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/profile" className="flex">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        Support
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <Outlet />
              <Toaster richColors />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default Layout;
