import { useContext } from "react";
import BookSection from "../components/sections/BookSection";
import UserBookSection from "../components/sections/UserBookSection";
import { useGetBooksQuery } from "../services/libServices";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

const BooksPage = () => {
  const { userBookType } = useParams();

  const { user } = useContext(UserContext);

  const allBooksResponse = useGetBooksQuery();

  const issuedBooksData = allBooksResponse.data?.filter(
    (book) =>
      user?.issuedBooks.findIndex(
        (Issuedbook) => Issuedbook.bookId === book.id
      ) > -1
  );

  const favBooksData = allBooksResponse.data?.filter(book => user?.favBooks.includes(book.id))
  return userBookType === "issued" ? (
    <UserBookSection {...allBooksResponse} data={issuedBooksData} />
  ) : userBookType === "wishlist" ? (
    <BookSection isExpanded {...allBooksResponse} isFavs data={favBooksData} />
  ) : (
    <BookSection isExpanded {...allBooksResponse} />
  );
};

export default BooksPage;
