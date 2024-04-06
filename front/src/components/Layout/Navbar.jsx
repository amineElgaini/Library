import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users } from "lucide-react";

function Navbar({ links, auth }) {
  const location = useLocation();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <img className="w-[30px]" src="./logo.png" alt="" />
      {auth?.roles?.find((role) => [4]?.includes(role)) && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-foreground">
                Dashboards{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to={links.usersDashboard.path}
                  className={
                    location.pathname === links.usersDashboard.path
                      ? "w-full flex whitespace-nowrap text-foreground transition-colors hover:text-foreground"
                      : "w-full flex whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  <Users className="mr-2 h-4 w-4" />
                  {links.usersDashboard.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>

                <Link
                  to={links.borrowingRecordsDashboard.path}
                  className={
                    location.pathname === links.borrowingRecordsDashboard.path
                      ? "w-full flex whitespace-nowrap text-foreground transition-colors hover:text-foreground"
                      : "w-full flex whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {links.borrowingRecordsDashboard.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                  />
                </svg>
                <Link
                  to={links.borrowBookDashboard.path}
                  className={
                    location.pathname === links.borrowBookDashboard.path
                      ? "w-full flexwhitespace-nowrap text-foreground transition-colors hover:text-foreground"
                      : "w-full flexwhitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {links.borrowBookDashboard.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <Link
                  to={links.manageBooksDashboard.path}
                  className={
                    location.pathname === links.manageBooksDashboard.path
                      ? "w-full flexwhitespace-nowrap text-foreground transition-colors hover:text-foreground"
                      : "w-full flexwhitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {links.manageBooksDashboard.name}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to={links.mainDashboard.path}
            className={
              location.pathname === links.mainDashboard.path
                ? "whitespace-nowrap text-foreground transition-colors hover:text-foreground"
                : "whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {links.mainDashboard.name}
          </Link>
          <span>|</span>
        </>
      )}
      <Link
        to={links.books.path}
        className={
          location.pathname === links.books.path
            ? "whitespace-nowrap text-foreground transition-colors hover:text-foreground"
            : "whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
        }
      >
        {links.books.name}
      </Link>
    </nav>
  );
}

export default Navbar;
