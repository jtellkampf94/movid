import "./star.scss";

interface StarProps {
  percentageHighlighted: number;
}

const Star: React.FC<StarProps> = ({ percentageHighlighted }) => {
  return (
    <div className="star-outer">
      <div
        className="star-inner"
        style={{ width: `${percentageHighlighted}%` }}
      ></div>
    </div>
  );
};

export default Star;
