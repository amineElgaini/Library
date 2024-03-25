import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchBooks = ({ queryKey }) => {
    const bookId = queryKey[1];
    return axios.get(`${import.meta.env.VITE_API_KEY}/api/books/${bookId}`);
};

function BooksDetails() {
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["books", id],
        queryFn: fetchBooks,
    });
    return <div>{data?.data?.data.id}</div>;
}

export default BooksDetails;
