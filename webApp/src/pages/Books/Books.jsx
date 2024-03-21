import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "./components/BookCard";
import CardLoading from "./components/CardLoading";

const fetchBooks = () => {
    return axios.get(`${import.meta.env.VITE_API_KEY}/api/books`);
};

function Books() {
    const { data, isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });
    return (
        <div className="container flex gap-4 flex-wrap justify-center">
            {isLoading &&
                Array(10)
                    .fill(null)
                    .map((_, index) => (
                        <CardLoading key={index} /> // Add unique keys
                    ))}

            {data?.data?.data.map((book) => {
                return <BookCard key={book.id} book={book} />;
            })}
        </div>
    );
}

export default Books;
