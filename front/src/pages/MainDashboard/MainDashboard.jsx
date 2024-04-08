import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useStatisticsData,
  useTopBooks,
  useTopUsers,
} from "@/hooks/reactQuery/useStatistics";
import CountCard from "./component/CountCard";
import { Link } from "react-router-dom";
import BorrowedBookChart from "./component/BorrowedBookChart";

export function MainDashboard() {
  const { data: statistic, isLoading: statisticIsLoading } =
    useStatisticsData();
  const { data: topBooks, isLoading: topBooksIsLoading } = useTopBooks();
  const { data: topUsers, isLoading: topUsersIsLoading } = useTopUsers();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {statisticIsLoading ? (
          "loading..."
        ) : (
          <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
            <CountCard
              title={"Total Users"}
              data={statistic?.data?.usersCount}
            />
            <CountCard
              title={"Total Of Not Paid Books"}
              data={statistic?.data?.borrowedBooksNotPaidCount}
            />
            <CountCard
              title={"Late Books"}
              data={statistic?.data?.lateBooksCount}
            />
            <CountCard
              title={"Total Books"}
              data={statistic?.data?.booksCount}
            />
          </div>
        )}

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {!topBooksIsLoading && (
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Most Borroed Books</CardTitle>
                  <CardDescription>
                    The Most Borroed Books By Users.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link to="/manageBooks">
                    Books Dashboard
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Id</TableHead>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Borrowed Now</TableHead>
                      <TableHead className="text-right">
                        Borrowed Times
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topBooks?.data.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <div className="font-medium">{book.id}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {book.isbn}
                          </div>
                        </TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.borrowedNow}</TableCell>
                        <TableCell className="text-right">
                          {book.borrowedTimes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Top Active Users</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {!topUsersIsLoading &&
                topUsers?.data.map((user) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                        
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex gap-2 items-center">{user.borrowedTimes}<img className="h-[23px]" src="./borrowBook.png" alt="" /></div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        <BorrowedBookChart/>
      </main>
    </div>
  );
}
