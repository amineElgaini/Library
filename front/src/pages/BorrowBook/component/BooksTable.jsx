import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BorrowBookButton from "./BorrowBookButton";

function BooksTable({ books }) {
  return (
    <Table className="mx-auto">
      <TableCaption>Table Of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>BookId</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead>Borrowed Copies</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => {
          return (
            <TableRow key={book.bookId}>
              <TableCell>{book.bookId}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>
                {book.numberOfCopies}/
                {book.numberOfCopies - book.availableCopies}
              </TableCell>
              <TableCell>
                <BorrowBookButton bookId={book.bookId} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default BooksTable;
