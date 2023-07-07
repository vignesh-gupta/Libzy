import { useContext } from "react";
import {
  useUpdateTranscationsMutation,
  useUpdateUserMutation,
} from "../../services/libServices";
import { UserContext } from "../../App";
import {
  calulatePenalty,
  getReturnMsg,
  setCookie,
} from "../../utils/util-functions";
import StarRating from "./StarRating";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const BookCard = ({ title, imgUrl, author, description, id, rating }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const [removeIssuedBook] = useUpdateUserMutation();
  const [updateTranscation] = useUpdateTranscationsMutation();

  async function handleBookReturn() {
    const returnedBook = user?.issuedBooks?.filter(
      (book) => book.bookId === id
    )[0];
    const updatedIssuedBook = user?.issuedBooks?.filter(
      (book) => book.bookId !== id
    );

    try {
      let panelty = calulatePenalty(
        moment().format(DATE_FORMAT),
        returnedBook?.returnDate
      );

      if (panelty > 0)
        swal(`Please pay the amount of ${panelty} to the Libary Reception due to delay book submission`);

      await updateTranscation({
        body: {
          returnDate: moment().format(DATE_FORMAT),
        },
        transactionsId: returnedBook?.transcationId,
      });
      let { data: updatedUser } = await removeIssuedBook({
        body: {
          issuedBooks: updatedIssuedBook,
        },
        userId: user?.id,
      });

      setUser(updatedUser);
      setCookie("user", updatedUser, 1);
    } catch (error) {
      console.log(error);
      navigate("/error")
      return; 
    }
  }

  return (
    <div className="card flex-col sm:flex-row card-side bg-base-100 shadow-xl px-8 sm:w-full w-4/5 ">
      <figure className=" p-2 shrink-0 sm:min-w-[30vw] object-scale-down">
        <img src={imgUrl} alt={title} className="max-h-80 object-contain" />
      </figure>
      <div className="card-body flex-3">
        <h2 className="card-title">{title}</h2>
        <div className="flex flex-col gap-2 pl-2">
          <p>
            <span className="font-semibold truncate w-full">
              What is this about?
            </span>
            <br />
            {description}
          </p>
          <p>
            <span className="font-semibold">Author : </span> {author}
          </p>
          <div>
            <span className="font-semibold">Rating : </span>
            <StarRating rating={rating} />
          </div>
          <p className="text-green-900">
            {getReturnMsg(id, user?.issuedBooks)}
          </p>
        </div>
        <div className="card-actions justify-end flex-1 items-end">
          <button className="btn btn-primary" onClick={handleBookReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
