
import BorrowedBooksLately from "./component/BorrowedBooksLately";
import BorrowedBooksNow from "./component/BorrowedBooksNow";
import Statistics from "./component/Statistics";
import MostBorrowedBook from "./component/MostBorrowedBook";
import TopActiveUsers from "./component/TopActiveUsers";

export function MainDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Statistics />
        <div className="flex gap-4 flex-wrap items-center justify-evenly">
          <BorrowedBooksLately />
          <BorrowedBooksNow />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <MostBorrowedBook />
          <TopActiveUsers />
        </div>
      </main>
    </div>
  );
}
