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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTopBooks } from "@/hooks/reactQuery/useStatistics";

function MostBorrowedBook() {
  const { data: topBooks, isLoading: topBooksIsLoading } = useTopBooks();

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Most Borroed Books</CardTitle>
          <CardDescription>The Most Borroed Books By Users.</CardDescription>
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
              <TableHead className="text-right">Borrowed Times</TableHead>
            </TableRow>
          </TableHeader>
          {!topBooksIsLoading && (
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
          )}
        </Table>
      </CardContent>
    </Card>
  );
}

export default MostBorrowedBook;
