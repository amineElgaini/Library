import { Link, Outlet, useLocation } from "react-router-dom";
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
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";

import { Toaster } from "sonner";
import { useGetLogedInUserInfo } from "@/hooks/useUsers";
import { useEffect, useState } from "react";

const dashBoardLinks = [
  {
    path: "/users",
    name: "Users",
    // desc: "Manage Users, Search, Create, Delete or Update",
  },
  {
    path: "/borrowBook",
    name: "Borrow Book",
    // desc: "Borrow Books To Users",
  },
  {
    path: "/borrowingRecords",
    name: "Borrowing Records",
    // desc: "Manage Borrowed Books, Return/Pay a book",
  },
  {
    path: "/manageBooks",
    name: "Books Dashboard",
    // desc: "Manage Books/Copies, Add, Create, Update Books/Copies",
  },
  {
    path: "/mainDashboard",
    name: "Dashboard",
    // desc: "Manage Books/Copies, Add, Create, Update Books/Copies",
  },
];

// admin: 4,

function NavBar() {
  // this state rerender the component when the auth is set
  const [authFinished, setAuthFinished] = useState(false);
  const location = useLocation();

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
              <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <img className="w-[35px]" src="./logo.png" alt="" />
                {auth?.roles?.find((role) => [4]?.includes(role)) ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="cursor-pointer text-muted-foreground whitespace-nowrap hover:text-foreground">
                          Dashboards
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {dashBoardLinks.map((link) => (
                          <DropdownMenuItem key={link.path}>
                            <Link
                              to={link.path}
                              className={
                                location.pathname === link.path
                                  ? "hover:text-foreground whitespace-nowrap"
                                  : "text-muted-foreground whitespace-nowrap hover:text-foreground"
                              }
                            >
                              {link.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Link
                      to="/mainDashboard"
                      className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Main Dashboard
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <Link
                  to="/books"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Books
                </Link>
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <img className="w-[35px]" src="./logo.png" alt="" />
                    {auth?.roles?.find((role) => [4]?.includes(role))
                      ? dashBoardLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className={
                              location.pathname === link.path
                                ? "hover:text-foreground whitespace-nowrap"
                                : "text-muted-foreground whitespace-nowrap hover:text-foreground"
                            }
                          >
                            {link.name}
                          </Link>
                        ))
                      : ""}
                    <Link
                      to="/books"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Books
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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

export default NavBar;
