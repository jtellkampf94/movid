import Star from "../Star";

interface NewStarRating {
  rating: number;
}

const NewStarRating: React.FC<NewStarRating> = ({ rating }) => {
  return (
    <div className="new-star-rating">
      {Array(5)
        .fill(0)
        .map((star: any, index: number) => {
          const starNumber = index + 1;
          const ratingOfFive = rating / 2;
          const isHighlighted = starNumber <= ratingOfFive;
          const ratingMinusStarNumber = ratingOfFive - starNumber;
          let percentageHighlighted;
          if (ratingMinusStarNumber < 0 && ratingMinusStarNumber > -1) {
            percentageHighlighted = (ratingMinusStarNumber + 1) * 100;
          } else if (!isHighlighted) {
            percentageHighlighted = 0;
          } else {
            percentageHighlighted = 100;
          }
          return <Star percentageHighlighted={percentageHighlighted} />;
        })}
    </div>
  );
};

export default NewStarRating;
