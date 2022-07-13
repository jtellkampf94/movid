import { Link } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { usePopover } from "../../hooks/usePopover";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./favoritesButton.scss";

interface FavoritesButtonProps {
  mediaId: number;
  mediaType: string;
  sessionId: string;
  favorite: boolean;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  mediaId,
  mediaType,
  sessionId,
  favorite,
}) => {
  const { showPopover, setShowPopover } = usePopover();
  const { markAsFavorite } = useActions();
  const { id } = useTypedSelector((state) => state.user.details);

  const handleClick = () => {
    if (sessionId.length > 0) {
      markAsFavorite({
        sessionId,
        favorite: favorite ? false : true,
        accountId: id.toString(),
        mediaType,
        mediaId,
      });
    } else {
      setShowPopover(true);
    }
  };

  return (
    <div className="favorites-button">
      <i
        className="favorites-button-button far fa-thumbs-up"
        style={{ color: `${favorite ? "green" : "white"}` }}
        onClick={handleClick}
      />

      {showPopover && (
        <div className="popover">
          Please sign in <Link to="/login">here</Link> first
        </div>
      )}
    </div>
  );
};

export default FavoritesButton;
