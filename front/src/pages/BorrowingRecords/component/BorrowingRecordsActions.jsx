import {
  usePayBorrowedBook,
  useReturnBorrowedBook,
} from "@/hooks/reactQuery/useBorrowing";
import ActionButton from "./ActionButton";

function BorrowingRecordsActions({ borrowingRecord }) {
  const { mutate: returnBook } = useReturnBorrowedBook();
  const { mutate: payBook } = usePayBorrowedBook();
  return (
    <>
      <ActionButton
        disable={borrowingRecord.actualReturnDate !== null}
        actionName={"Return"}
        actionDescription={"You Will Return The Book To The Library"}
        action={() => returnBook({ borrowId: borrowingRecord.id })}
        color="blue"
      />
      <ActionButton
        disable={
          borrowingRecord.actualReturnDate === null ||
          borrowingRecord.paymentStatus === 1
        }
        actionName={"Pay"}
        actionDescription={"You Will Pay The Book Fee To The Library"}
        action={() => payBook({ borrowId: borrowingRecord.id })}
        color="green"
      />
    </>
  );
}

export default BorrowingRecordsActions;
