import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import { usePopover } from "../../hooks/usePopover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Star from "../Star";

import "./newStarRating.scss";

interface NewStarRating {
  rating: number;
}

const NewStarRating: React.FC<NewStarRating> = ({ rating }) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<undefined | number>(undefined);
  const { showPopover, setShowPopover } = usePopover();
  const { session_id } = useTypedSelector(state => state.auth.session);

  useEffect(() => {
    setCurrentRating(rating / 2);
  }, []);

  const handleClick = (rating: number) => {
    if (session_id.length > 0) {
      setCurrentRating(rating);
    } else {
      setShowPopover(true);
    }
  };

  const handleMouseOver = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(undefined);
  };
  return (
    <Fragment>
      <div className="new-star-rating">
        {Array(5)
          .fill(0)
          .map((star: any, index: number) => {
            const starNumber = index + 1;
            const isHighlighted = starNumber <= currentRating;
            const ratingMinusStarNumber = currentRating - starNumber;
            let percentageHighlighted;
            if (
              ratingMinusStarNumber < 0 &&
              ratingMinusStarNumber > -1 &&
              !hoverRating
            ) {
              percentageHighlighted = (ratingMinusStarNumber + 1) * 100;
            } else if (!isHighlighted || hoverRating) {
              percentageHighlighted = 0;
            } else {
              percentageHighlighted = 100;
            }
            return (
              <Star
                isHovered={hoverRating ? hoverRating >= starNumber : false}
                handleMouseLeave={handleMouseLeave}
                handleClick={() => handleClick(starNumber)}
                handleMouseOver={() => handleMouseOver(starNumber)}
                percentageHighlighted={percentageHighlighted}
              />
            );
          })}
      </div>
      {showPopover && (
        <div className="star-rating-popover">
          Please log in <Link to="/login">here</Link> first
        </div>
      )}
    </Fragment>
  );
};

export default NewStarRating;
