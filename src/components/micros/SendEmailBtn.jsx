import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calulatePenalty, sendEmail } from "../../utils/util-functions";
import moment from "moment";
import { useState } from "react";
import swal from "sweetalert";

const SendEmailBtn = ({
  userEmail,
  user,
  bookName,
  issuedDate,
  dueDate,
  returnDate,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleNotify(email, name, book, issuedDate, panelty) {
    let response = await sendEmail(email, name, book, issuedDate, panelty);
    console.log(response);
    setIsLoading(false);

    if (response?.status === 200) {
      swal("Email sent successfully!", {
        icon: "success",
      });
      console.log(response);
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
      console.log(response);
    }
  }

  return (
    <td
      className="flex gap-2 tooltip tooltip-left"
      data-tip={` Ask ${user} to return ${bookName} `}
    >
      <button
        className={`btn btn-outline btn-square ${
          returnDate || isLoading ? "btn-disabled" : "btn-secondary"
        }`}
        onClick={() => {
          setIsLoading(true);
          handleNotify(
            userEmail,
            user,
            bookName,
            issuedDate,
            calulatePenalty(moment(), dueDate)
          );
        }}
        disabled={returnDate || isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : (
          <FontAwesomeIcon icon={faCommentDots} />
        )}
      </button>
    </td>
  );
};

export default SendEmailBtn;
