import { Badge } from "@/components/ui/badge";

function BorrowingRecordStatus({ borrowingRecord }) {
  const paid = borrowingRecord.paymentStatus === 1;

  let notPaid = borrowingRecord.actualReturnDate !== null && !paid;

  const late =
    Date.now() - Date.parse(borrowingRecord.dueDate) > 0 &&
    borrowingRecord.actualReturnDate === null;

  const borrow = !late && borrowingRecord.actualReturnDate === null && !paid;

  return (
    <>
      {borrow ? <Badge className={"whitespace-nowrap"}>borrow</Badge> : ""}
      {paid ? (
        <Badge className={"whitespace-nowrap"} variant="success">
          Paid
        </Badge>
      ) : (
        ""
      )}
      {late ? (
        <Badge className={"whitespace-nowrap"} variant="warnning">
          Late
        </Badge>
      ) : (
        ""
      )}
      {notPaid ? (
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
