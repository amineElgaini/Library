import { Badge } from "@/components/ui/badge";

function BorrowingRecordStatus({ borrowingRecord }) {
  return (
    <>
      {borrowingRecord.status == "borrow" ? (
        <Badge className={"whitespace-nowrap"}>borrow</Badge>
      ) : borrowingRecord.status == "paid" ? (
        <Badge className={"whitespace-nowrap"} variant="success">
          Paid
        </Badge>
      ) : borrowingRecord.status == "late" ? (
        <Badge className={"whitespace-nowrap"} variant="warnning">
          Late
        </Badge>
      ) : borrowingRecord.status == "notPaid" ? (
        <Badge className={"whitespace-nowrap"} variant="primary">
          Not Paid
        </Badge>
      ) : (
        ""
      )}
    </>
  );
}

export default BorrowingRecordStatus;
