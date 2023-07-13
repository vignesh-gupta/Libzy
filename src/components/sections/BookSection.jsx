import { useEffect, useState } from "react";
import BookCard from "../micros/BookCard";
import BookFilters from "../micros/BookFilters";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

const BookSection = ({ isExpanded, data = "", error, isLoading, isFavs }) => {
  const [books, setBooks] = useState();
  const [filters, setFilters] = useState({ search: "", rating: 0 });
  const { user } = useContext(UserContext);

  useEffect(() => {
    setBooks(data || []);
  }, [data]);

  if (isFavs && !user) return <Navigate to={"/"} />;

  return (
    <>
      {isExpanded && (
        <BookFilters
          filters={filters}
          setFilters={setFilters}
          booksList={data}
          setBooks={setBooks}
        />
      )}

      <div className="flex flex-wrap justify-center gap-5 p-4">
        {isLoading
          ? "Loading"
          : error
          ? "Unable to Load Data"
          : books?.length === 0
          ? "No Book with this cateria"
          : books
              ?.slice(0, isExpanded ? books.length : 3)
              ?.map((book) => <BookCard {...book} key={book.id} />)}
      </div>

      {!isExpanded && books?.length > 3 && (
        <div className="flex justify-center ">
          <a href="/books" className="btn btn-outline btn-secondary">
            All Books
          </a>
        </div>
      )}
    </>
  );
};

export default BookSection;
