import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarBorder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const StarRating = ({ rating }) => {
  const ratingArr = [1, 1, 1, 1, 1].map((_, i) => {
    if (rating - i >= 1) return 1;
    if (rating - i === 0.5) return 0.5;
    return 0;
  });

  return (
    <>
      {ratingArr.map((element , i) => (
        <FontAwesomeIcon
          key={i}
          icon={
            element >= 1
              ? faStar
              : element > 0
              ? faStarHalfStroke
              : faStarBorder
          }
          style={{ color: "#66cc8a" }}
        />
      ))}
    </>
  );
};

export default StarRating;
