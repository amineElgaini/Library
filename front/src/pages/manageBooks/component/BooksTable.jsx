import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function BooksTable({ books }) {
  return (
    <>
      <Table>
        <TableCaption>A list of your books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>isbn</TableHead>
            <TableHead>title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => {
            return (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.bookId}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>More Info</DropdownMenuItem>
                      <DropdownMenuItem>Edit Book</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default BooksTable;
