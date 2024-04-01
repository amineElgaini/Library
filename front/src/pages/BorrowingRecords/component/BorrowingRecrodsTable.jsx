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
import { format } from "date-fns";
import BorrowingRecordStatus from "./BorrowingRecordStatus";

function BorrowingRecrodsTable({ borrowingRecords }) {
  return (
    <Table>
      <TableCaption>Table Of Borrowing Records</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>CopyId</TableHead>
          <TableHead>borrowingDate</TableHead>
          <TableHead>dueDate</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowingRecords.map((borrowingRecord) => {
          return (
            <TableRow key={borrowingRecord.id}>
              <TableCell>{borrowingRecord.id}</TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="text-blue-400">
                  [{borrowingRecord.userId}]{" "}
                </span>
                {borrowingRecord.username}
              </TableCell>
              <TableCell>{borrowingRecord.copyId}</TableCell>
              <TableCell>
                {format(borrowingRecord.borrowingDate, "M-d-y")}
              </TableCell>
              <TableCell>{format(borrowingRecord.dueDate, "M-d-y")}</TableCell>
              <TableCell>
                <BorrowingRecordStatus borrowingRecord={borrowingRecord} />
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
