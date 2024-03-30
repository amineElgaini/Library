import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

function BorrowingRecordStatus({ borrowingRecord }) {
  const [passedTheTime, setPassedTheTime] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (
      Date.now() - Date.parse(borrowingRecord.dueDate) > 0 &&
      borrowingRecord.actualReturnDate === null
    ) {
      setPassedTheTime(true);
    }
    setIsPaid(borrowingRecord?.fine?.paymentStatus === 1);
  }, []);
  return (
    <>
      {passedTheTime ? (
        <Badge className={"whitespace-nowrap"} variant="warnning">
          Not Returned
        </Badge>
      ) : (
        ""
      )}
      {isPaid ? <Badge variant="primary">Paid</Badge> : ""}
    </>
  );
}

export default BorrowingRecordStatus;
