import { useNavigate } from "react-router-dom";
import {
  useAddBookMutation,
  useUpdateBookMutation,
} from "../../services/libServices";
import swal from "sweetalert";

const BookModal = ({ selectedBook, setSelectedBook, setAllBooks }) => {
  const [updateBook] = useUpdateBookMutation();
  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      if (selectedBook?.id || "") {
        updateBook({
          body: selectedBook,
          bookId: selectedBook?.id || "",
          method: "PUT",
        });
        setAllBooks((prev) => {
          let newBooks = [...prev];
          newBooks.splice(
            prev.findIndex((book) => book?.id === selectedBook?.id || ""),
            1,
            selectedBook
          );
          return newBooks;
        });
        swal("Book Updated!", "If the changes is not visible refresh the page once.", "success");
      } else {
        let addedBook = await addBook(selectedBook).then((res) => res.data);
        setAllBooks((prev) => [...prev, addedBook]);
        console.log(addedBook);
        swal("Book Added!", "If the book is not visivle refresh the page once.", "success");

      }
    } catch (error) {
      console.log(error);
      navigate("/error");
      return;
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setSelectedBook((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <>
      <dialog id="book_modal" className="modal">
        <form method="dialog" className="w-11/12 max-w-5xl modal-box">
          <h3 className="text-xl font-semibold">Edit Books</h3>
          <div className="flex flex-wrap w-full gap-2 py-4">
            <div className="grow">
              <label className="label" htmlFor="title">
                <span className="label-text">Title of the Book</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="w-full input input-bordered"
                id="title"
                value={selectedBook?.title || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grow shrink-0">
              <label className="label" htmlFor="author">
                <span className="label-text ">Author of the Book</span>
              </label>
              <input
                type="text"
                placeholder="Author"
                className="w-full input input-bordered"
                id="author"
                value={selectedBook?.author || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grow">
              <label className="label">
                <span className="label-text">Trending</span>
              </label>
              <input
                type="checkbox"
                checked={selectedBook?.isTrending || false}
                onChange={() =>
                  setSelectedBook({
                    ...selectedBook,
                    isTrending: !selectedBook?.isTrending || "",
                  })
                }
                className="checkbox checkbox-lg"
              />
            </div>
            <div className="basis-1/2">
              <label className="label" htmlFor="imgUrl">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                placeholder="Image"
                className="w-full input input-bordered"
                id="imgUrl"
                value={selectedBook?.imgUrl || ""}
                onChange={handleChange}
              />
              <a
                target="_blank"
                href={selectedBook?.imgUrl || ""}
                className="text-xs link"
                rel="noreferrer"
              >
                Check out
              </a>
            </div>

            <div className="grow">
              <label className="label" htmlFor="count">
                <span className="label-text ">Available Count</span>
              </label>
              <input
                type="number"
                placeholder="Available Count"
                className="w-full input input-bordered"
                id="count"
                value={selectedBook?.count || ""}
                onChange={handleChange}
                min={0}
                max={10}
              />
            </div>

            <div className="grow">
              <label className="label" htmlFor="rating">
                <span className="label-text ">Rating of the Book</span>
              </label>
              <input
                type="number"
                placeholder="Available Count"
                className="w-full input input-bordered"
                id="rating"
                value={selectedBook?.rating || ""}
                onChange={handleChange}
                min={0}
                max={5}
                step={0.5}
              />
            </div>
          </div>

          <div className="flex-grow">
            <label className="label" htmlFor="description">
              <span className="label-text ">Description of the Book</span>
            </label>
            <textarea
              placeholder="Description of the Book"
              className="w-full textarea textarea-bordered"
              id="description"
              value={selectedBook?.description || ""}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>

        {/* To Implement the close on outside click functionality */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BookModal;
