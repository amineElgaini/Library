import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchBooks = ({ queryKey }) => {
  const bookId = queryKey[1];
  return axios.get(`${import.meta.env.VITE_API_KEY}/api/books/${bookId}`);
};

function BooksDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["books", id],
    queryFn: fetchBooks,
  });

  const book = data?.data?.data;

  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <p>
            Title: <span className="text-muted-foreground">{book.title}</span>
          </p>
          <p>
            Publication Date:{" "}
            <span className="text-muted-foreground">
              {book.publicationDate}
            </span>
          </p>
          <p>
            Genre: <span className="text-muted-foreground">{book.genre}</span>
          </p>
          <p>
            Description:{" "}
            <span className="text-muted-foreground">
              {book.additionalDetails}
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default BooksDetails;
