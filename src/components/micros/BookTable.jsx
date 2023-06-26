import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookModal from "./BookModal";
import { useEffect, useState } from "react";
import { useUpdateBookMutation } from "../../services/libServices";
import { useNavigate } from "react-router-dom";

const BookTable = ({ books }) => {
  const newBook = {
    title: "",
    description: "",
    isTrending: false,
    count: 0,
    rating: 0,
    author: "",
  };

  const navigate = useNavigate();


  const [allBooks, setAllBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(newBook);

  const [deleteBook] = useUpdateBookMutation();

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

  function handleAddBooks() {
    setSelectedBook(newBook);
    window.book_modal.showModal();
  }

  function handleEditBooks(id) {
    let book = allBooks?.filter((b) => b.id === id)[0];
    setSelectedBook(book);
    window.book_modal.showModal();
  }

  function handleDeleteBooks(id) {
    setAllBooks((prev) => {
      let updatedBooks = [...prev].filter((book) => book.id !== id);
      return updatedBooks;
    });

    try {
      deleteBook({ bookId: id, method: "DELETE" });
    } catch (error) {
      console.log(error);
      navigate("/error");
      return;
    }
  }

  return (
    <div className="overflow-x-auto py-5 ">
      <div className="flex justify-end">
        <button className="btn btn-secondary" onClick={handleAddBooks}>
          Add Book
        </button>
      </div>
      <table className="table table-auto table-pin-rows table-pin-cols shadow-xl">
        <caption className="caption-top text-lg font-semibold mb-2">
          Books
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th className="hidden lg:flex">Description</th>
            <th>Author</th>
            <th>Trending</th>
            <th>Rating</th>
            <th>Available Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBooks?.map(
            ({
              id,
              title,
              description,
              isTrending,
              count,
              rating,
              author,
              imgUrl,
            }) => (
              <tr key={id} className="hover">
                <td>{id}</td>
                <td>
                  <a
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                  >
                    {title}
                  </a>
                </td>
                <td className="hidden lg:flex">{description}</td>
                <td>{author}</td>
                <td>
                  <input type="checkbox" checked={isTrending} disabled />
                </td>
                <td>{rating}</td>
                <td>{count}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-outline btn-square btn-secondary "
                    onClick={() => handleEditBooks(id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="btn btn-outline btn-square btn-error"
                    onClick={() => handleDeleteBooks(id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <BookModal
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        setAllBooks={setAllBooks}
        allBooks={allBooks}
      />
    </div>
  );
};

export default BookTable;
