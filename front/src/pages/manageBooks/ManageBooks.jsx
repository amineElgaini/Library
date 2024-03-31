import { useBooksData } from "@/hooks/useBook";
import BooksTable from "./component/BooksTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ManageBooks() {
  const { data, isLoading } = useBooksData();

  return (
    <>
      <div className="flex items-center justify-between">
        <Input type="text" className="w-[200px]" placeholder="isbn" />
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
      {isLoading ? "loading..." : <BooksTable books={data?.data.data} />}
    </>
  );
}

export default ManageBooks;
