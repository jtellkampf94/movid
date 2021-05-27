import "./starRating.scss";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="star-rating">
      <div className="star-rating-stars-outer">
        <div
          className="star-rating-stars-inner"
          style={{ width: `${rating * 10}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StarRating;
