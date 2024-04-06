import { CalendarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function BookCard({ book }) {
  const date = new Date(book.publicationDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
  });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={`/books/${book.bookId}`}>
            <div className="border-2 w-[300px] flex rounded-lg p-3 m-2">
              <div className="w-36 rounded-lg">
                <img
                  src="./BookImage.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start ml-4">
                <h4 className="text-xl font-semibold">{book.title}</h4>
                <p className="text-sm">
                  {book.additionalDetails.substring(0, 50)}...
                </p>

                <div className="flex w-full mt-3 items-center justify-between">
                  <span className="leading-none uppercase rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    {book.genre}
                  </span>

                  <div className="flex gap-1 text-xs text-muted-foreground">
                    <span>{formattedDate}</span>
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="w-[200px] bg-blue-600">
          <p>{book.additionalDetails}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BookCard;
