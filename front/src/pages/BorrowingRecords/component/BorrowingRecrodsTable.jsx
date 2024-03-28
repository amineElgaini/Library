import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BorrowingRecordsActions from "./BorrowingRecordsActions";

function BorrowingRecrodsTable({ borrowingRecords }) {
  console.log("hi", borrowingRecords);
  return (
    <Table className="mx-auto">
      <TableCaption>Table Of Borrowing Records</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>CopyId</TableHead>
          <TableHead>borrowingDate</TableHead>
          <TableHead>dueDate</TableHead>
          <TableHead>actualReturnDate</TableHead>
          <TableHead>fineAmount</TableHead>
          <TableHead>paymentStatus</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowingRecords.map((borrowingRecord) => {
          return (
            <TableRow key={borrowingRecord.id}>
              <TableCell>{borrowingRecord.id}</TableCell>
              <TableCell>{borrowingRecord.userId}</TableCell>
              <TableCell>{borrowingRecord.copyId}</TableCell>
              <TableCell>{borrowingRecord.borrowingDate}</TableCell>
              <TableCell>{borrowingRecord.dueDate}</TableCell>
              <TableCell>{borrowingRecord.actualReturnDate}</TableCell>
              <TableCell>{borrowingRecord?.fine?.fineAmount}</TableCell>
              <TableCell>
                {borrowingRecord?.fine?.paymentStatus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="flex gap-3">
                <BorrowingRecordsActions borrowingRecord={borrowingRecord} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default BorrowingRecrodsTable;
