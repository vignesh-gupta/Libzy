import { useEffect, useState } from "react";
import BookFilters from "../micros/BookFilters";
import BookCardV2 from "../micros/BookCardV2";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const UserBookSection = ({ data = "", error, isLoading }) => {
  const [books, setBooks] = useState();
  const [filters, setFilters] = useState({ search: "", rating: 0 });

  const { user } = useContext(UserContext);

  useEffect(() => {
    setBooks(data || []);
  }, [data]);

  if (!user) return <Navigate to={"/"} />;

  return (
    <section>
      <BookFilters
        filters={filters}
        setFilters={setFilters}
        booksList={data}
        setBooks={setBooks}
      />

      <div className="flex flex-wrap justify-center gap-5 p-4">
        {isLoading
          ? "Loading"
          : error
          ? "Unable to Load Data"
          : books?.length === 0
          ? "No Issued Book"
          : books?.map((book) => <BookCardV2 {...book} key={book.id} />)}
      </div>
    </section>
  );
};

export default UserBookSection;
