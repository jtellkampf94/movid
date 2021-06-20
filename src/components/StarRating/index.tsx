import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";

import { usePopover } from "../../hooks/usePopover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Star from "../Star";

import "./starRating.scss";

interface StarRatingProps {
  rating: number;
  active: boolean;
  itemType?: "tv" | "movie";
  id?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  active,
  itemType,
  id
}) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<undefined | number>(undefined);
  const [successfulRating, setSuccessfulRating] = useState(false);

  const { showPopover, setShowPopover } = usePopover();

  const state = useTypedSelector(state => state);
  const { id: accountId } = state.user.details;
  const { session_id: sessionId } = state.auth.session;
  const { rateItem } = useActions();

  useEffect(() => {
    if (currentRating === 0) {
      setCurrentRating(rating / 2);
    }
  }, [currentRating]);

  const handleClick = (rating: number) => {
    setSuccessfulRating(false);
    if (active && itemType && id) {
      if (sessionId.length > 0) {
        rateItem({
          itemType,
          sessionId,
          accountId: accountId.toString(),
          rating: rating * 2,
          id: id.toString()
        });
        setCurrentRating(rating);
        setSuccessfulRating(true);
        setShowPopover(true);
      } else {
        setShowPopover(true);
      }
    } else {
      return;
    }
  };

  const handleMouseOver = (rating: number) => {
    if (active) {
      setHoverRating(rating);
    } else {
      return;
    }
  };

  const handleMouseLeave = () => {
    if (active) {
      setHoverRating(undefined);
    } else {
      return;
    }
  };
  return (
    <Fragment>
      <div className="star-rating">
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
          {successfulRating ? (
            <span>You rated this {currentRating} stars</span>
          ) : (
            <span>
              Please log in <Link to="/login">here</Link> first
            </span>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default StarRating;
