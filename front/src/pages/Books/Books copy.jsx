import { useQuery } from "@tanstack/react-query";

import BookCard from "./components/BookCard";
import CardLoading from "./components/CardLoading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

const LINK = `${import.meta.env.VITE_API_KEY}/api/books`;

export const fetchBooks = (queryKey, token) => {
  return axios.get(queryKey, {
    headers: { Authorization: "Bearer " + token },
  });
};

function Books() {
  const { auth } = useAuth();
  const [url, setUrl] = useState(`${import.meta.env.VITE_API_KEY}/api/books`);

  const [filters, setFilters] = useState({
    title: "",
    genre: "",
  });

  const changeLink = (v) => {
    // toast("Event has been created", {
    //   description: "Sunday, December 03, 2023 at 9:00 AM",
    //   action: {
    //     label: "Undo",
    //     onClick: () => console.log("Undo"),
    //   },
    // })

    let newUrl = new URL(LINK);
    let newUrlValue = { ...filters, [v.target.name]: v.target.value };

    if (newUrlValue.title !== "") {
      newUrl.searchParams.set("title[eq]", newUrlValue.title);
    }
    if (newUrlValue.genre !== "") {
      newUrl.searchParams.set("genre[eq]", newUrlValue.genre);
    }

    setFilters(newUrlValue);
    setUrl(newUrl.toString());
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", url],
    queryFn: () => fetchBooks(url, auth.accessToken),
  });

  return (
    <div className="container">
      <div className="my-4 flex gap-4 max-w-md mx-auto">
        <Input
          name="genre"
          onChange={(e) => changeLink(e)}
          placeholder="genre"
        ></Input>

        <Input
          name="title"
          onChange={(e) => {
            changeLink(e);
          }}
          placeholder="title"
        ></Input>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            className="p-2"
            disabled={data?.data.meta.current_page === 1}
            dis
            onClick={() => {
              setUrl(data?.data.links.prev);
            }}
          >
            {" "}
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 4L9 11L4.5 7.5L9 4Z" fill="currentColor"></path>
            </svg>{" "}
          </Button>
          <Button
            size="sm"
            className="p-2"
            disabled={
              data?.data.meta.last_page === data?.data.meta.current_page
            }
            onClick={() => {
              setUrl(data?.data.links.next);
            }}
          >
            {" "}
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path>
            </svg>{" "}
          </Button>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {isError && "error"}
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, index) => <CardLoading key={index} />)}
        {data?.data?.data.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
}

export default Books;
