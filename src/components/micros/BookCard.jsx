import { faFire, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  useAddNewTranscationsMutation,
  useUpdateUserMutation,
} from "../../services/libServices";
import { UserContext } from "../../App";
import { setCookie } from "../../utils/util-functions";
import moment from "moment/moment";
import StarRating from "./StarRating";
import { DATE_FORMAT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const BookCard = ({
  title,
  imgUrl,
  author,
  description,
  count,
  id,
  rating,
  isTrending,
}) => {
  const { user, setUser } = useContext(UserContext);

  const [isFav, setIsFav] = useState(user?.favBooks?.includes(id));

  const [toogleFavBook] = useUpdateUserMutation();
  const [addIssuedBook] = useUpdateUserMutation();
  const [addTransaction] = useAddNewTranscationsMutation();
  const navigate = useNavigate();

  async function handleAddFav() {
    try {
      let newFav = [];
      isFav
        ? (newFav = user?.favBooks.filter((bookId) => bookId !== id))
        : (newFav = [...user?.favBooks, id]);

      const { data: updatedUser } = await toogleFavBook({
        body: { favBooks: [...new Set(newFav)] },
        userId: user?.id,
      });
      setUser(updatedUser);
      setIsFav(!isFav);
      setCookie("user", updatedUser, 1);
    } catch (error) {
      console.log(error);
      navigate("/error");
      return;
    }
  }

  async function handleBookIssue() {
    try {
      const dueDate = moment().add(7, "days").format(DATE_FORMAT);

      let { data: newTranscation } = await addTransaction({
        bookName: title,
        user: user?.name,
        userEmail: user?.email,
        issuedDate: moment().format(DATE_FORMAT),
        returnDate: "",
        dueDate,
      });

      let { data: updatedUser } = await addIssuedBook({
        body: {
          issuedBooks: [
            ...user?.issuedBooks,
            {
              bookId: id,
              returnDate: dueDate,
              transcationId: newTranscation?.id,
            },
          ],
        },
        userId: user?.id,
      });

      setUser(updatedUser);
      setCookie("user", updatedUser, 1);
    } catch (error) {
      console.log(error);
      navigate("/error");
      return;
    }
  }

  return (
    <div className="card card-compact w-80 flex-no-shrink bg-base-100 shadow-xl  border-black-800 border-2 ">
      <figure className="px-6 pt-6 grow lg:min-h-[60%]">
        <img src={imgUrl} alt={title} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {title}
          {isTrending && (
            <div className="tooltip" data-tip="Trending book">
              <FontAwesomeIcon icon={faFire} />
            </div>
          )}
        </h2>
        <p className="text-sm font-semibold">Author : {author}</p>
        <div className="tooltip" data-tip={description}>
        <p className="text-sm  max-w-xs px-5 truncate">{description}</p>
        </div>
        <p className="text-lg">
          <StarRating rating={rating} />
        </p>
        <div className="card-actions flex justify-around w-11/12 pt-4">
          {user && (
            <button className="btn btn-circle" onClick={handleAddFav}>
              <FontAwesomeIcon
                icon={isFav ? faHeart : faHeartBorder}
                size="xl"
                style={{ color: "#FD0808" }}
              />
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            disabled={
              !count > 0 ||
              user?.issuedBooks?.some((book) => book.bookId === id) ||
              !user
            }
            onClick={handleBookIssue}
          >
            {user?.issuedBooks?.some((book) => book.bookId === id)
              ? "Already Issued"
              : count > 0
              ? "Get It!"
              : "Not available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
