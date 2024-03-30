import { Link, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/hooks/useAuth";

import { Toaster } from "sonner";

const dashBoardLinks = [
  {
    link: "/users",
    name: "Users",
    desc: "Manage Users, Search, Create, Delete or Update",
  },
  {
    link: "/borrowBook",
    name: "Borrow Book",
    desc: "Borrow Books To Users",
  },
  {
    link: "/borrowingRecords",
    name: "Borrowing Records",
    desc: "Manage Borrowed Books, Return/Pay a book",
  },
  // {
  //   link: "/BooksDashboard",
  //   name: "Books Dashboard",
  //   desc: "Manage Books, Return/Pay a book",
  // },
];

// admin: 4,

function NavBar() {
  const { auth } = useAuth();

  return (
    <>
      <div className="mt-2 pb-2 border-b-2 border-b-slate-600">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            <ModeToggle />

            {auth?.roles?.find((role) => [4]?.includes(role)) ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                    {dashBoardLinks.map((link) => (
                      <ListItem
                        key={link.name}
                        link={link.link}
                        name={link.name}
                        desc={link.desc}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              ""
            )}

            <NavigationMenuItem>
              <Link to="/books" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Books
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {auth?.username !== undefined ? (
                <Link to="/profile" legacyBehavior passHref>
                  <Avatar>
                    <AvatarImage src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link to="/login" legacyBehavior passHref>
                  <Button>Login</Button>
                </Link>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="my-20">
        <Outlet />
        <Toaster richColors />
      </div>
    </>
  );
}

const ListItem = ({ link, name, desc }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={link}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className="text-sm font-medium leading-none">{name}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {desc}
          </p>
        </Link>
      </NavigationMenuLink>{" "}
    </li>
  );
};

export default NavBar;
