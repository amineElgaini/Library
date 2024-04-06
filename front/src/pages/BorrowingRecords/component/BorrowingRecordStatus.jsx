import { Badge } from "@/components/ui/badge";

function BorrowingRecordStatus({ borrowingRecord }) {
  return (
    <>
      {borrowingRecord.status == "borrowed" ? (
        <Badge className={"whitespace-nowrap"}>borrowed</Badge>
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
