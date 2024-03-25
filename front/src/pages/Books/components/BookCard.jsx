import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const date = new Date(book.publicationDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
  });
  return (
    <Link to={`/books/${book.id}`}>
      <div className="border-2 p-3 rounded bor flex items-center space-x-4 w-[250px]">
        <img
          className="d-[50px] w-[50px]"
          src={
            book.id % 2 === 0
              ? "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982137137/the-7-habits-of-highly-effective-people-9781982137137_hr.jpg"
              : "https://booksondemand.ma/cdn/shop/products/51fEYMhtHoL-min.jpg?v=1631701481"
          }
        />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{book.title}</h4>
          <p className="text-sm h-[50px]">
            {book.additionalDetails.substring(0, 50)}...
          </p>
          <div className="flex justify-between items-center pt-2">
            <Badge variant="secondary">{book.genre}</Badge>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
