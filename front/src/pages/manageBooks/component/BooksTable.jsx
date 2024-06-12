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
import Edit from "./Edit";
import Delete from "./Delete";
import More from "./More";

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
            <TableHead>category</TableHead>
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => {
            return (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.bookId}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.categoryName ?? "None"}</TableCell>
                <TableCell>{}</TableCell>
                {/* <TableCell className="flex items-center gap-3"> */}
                {/* <More book={book} /> */}
                {/* - <Edit book={book} /> */}
                {/* - <Delete book={book} /> */}
                {/* </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default BooksTable;
