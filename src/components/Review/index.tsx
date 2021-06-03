import { Reviews } from "../../redux/reducers/details-reducer";
import "./review.scss";

interface ReviewProps {
  reviews: Reviews["results"];
}

const Review: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <div className="review">
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className="review-container">
            <div className="review-content">"{review.content}"</div>
            <div className="review-author">
              <i>{review.author}</i>
            </div>
          </div>
        ))
      ) : (
        <div className="review-container">No Reviews have been made</div>
      )}
    </div>
  );
};

export default Review;
