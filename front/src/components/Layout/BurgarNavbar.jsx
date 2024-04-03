import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";

function BurgarNavbar({ links, auth }) {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <img className="w-[30px]" src="./logo.png" alt="" />
          {auth?.roles?.find((role) => [4]?.includes(role)) && (
            <>
              Dashboards:
              <div className="flex items-center">
                <Users className="mr-2 h-6 w-6" />
                <Link
                  to={links.usersDashboard.path}
                  className={
                    location.pathname === links.usersDashboard.path
                      ? "flex items-center hover:text-foreground whitespace-nowrap"
                      : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
                  }
                >
                  {links.usersDashboard.name}
                </Link>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-6 h-6"
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
                      ? "flex items-center hover:text-foreground whitespace-nowrap"
                      : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
                  }
                >
                  {links.borrowingRecordsDashboard.name}
                </Link>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-6 h-6"
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
                      ? "flex items-center hover:text-foreground whitespace-nowrap"
                      : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
                  }
                >
                  {links.borrowBookDashboard.name}
                </Link>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-6 h-6"
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
                      ? "flex items-center hover:text-foreground whitespace-nowrap"
                      : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
                  }
                >
                  {links.manageBooksDashboard.name}
                </Link>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                  />
                </svg>
                <Link
                  to={links.mainDashboard.path}
                  className={
                    location.pathname === links.mainDashboard.path
                      ? "flex items-center hover:text-foreground whitespace-nowrap"
                      : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
                  }
                >
                  {links.mainDashboard.name}
                </Link>
              </div>
              <hr />
            </>
          )}
          <Link
            to="/books"
            className={
              location.pathname === links.books.path
                ? "flex items-center hover:text-foreground whitespace-nowrap"
                : "flex items-center text-muted-foreground whitespace-nowrap hover:text-foreground"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Books
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default BurgarNavbar;
