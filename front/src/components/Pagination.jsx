import { Button } from "./ui/button";

function Pagination({ setFilter, pagination }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={pagination?.current_page === 1}
        onClick={() => {
          if (pagination?.current_page !== 1) {
            setFilter((p) => {
              return { ...p, page: pagination?.current_page - 1 };
            });
          }
        }}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={pagination?.current_page === pagination?.last_page}
        onClick={() => {
          if (pagination?.current_page !== pagination?.last_page) {
            setFilter((p) => {
              return { ...p, page: pagination?.current_page + 1 };
            });
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
