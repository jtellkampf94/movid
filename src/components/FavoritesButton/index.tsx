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
  favorite
}) => {
  const { showPopover, setShowPopover } = usePopover();
  const { markAsFavorite } = useActions();
  const { id } = useTypedSelector(state => state.user.details);

  const handleClick = () => {
    if (sessionId.length > 0) {
      markAsFavorite({
        sessionId,
        favorite: true,
        accountId: id.toString(),
        mediaType,
        mediaId
      });
    } else {
      setShowPopover(true);
    }
  };

  return (
    <div>
      <button
        disabled={favorite}
        style={{ backgroundColor: `${favorite ? "red" : "white"}` }}
        onClick={handleClick}
      >
        like
      </button>
      {showPopover && (
        <div>
          Please sign in <Link to="/login">here</Link> first
        </div>
      )}
    </div>
  );
};

export default FavoritesButton;
