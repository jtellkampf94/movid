import "./star.scss";

interface StarProps {
  percentageHighlighted: number;
  handleClick: () => void;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
  isHovered: boolean;
}

const Star: React.FC<StarProps> = ({
  percentageHighlighted,
  handleMouseOver,
  handleMouseLeave,
  handleClick,
  isHovered
}) => {
  return (
    <div
      className="star-outer"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="star-inner"
        style={{
          width: `${isHovered ? 100 : percentageHighlighted}%`
        }}
      ></div>
    </div>
  );
};

export default Star;
