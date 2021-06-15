import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { usePopover } from "../../hooks/usePopover";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./watchlistButton.scss";

interface WatchlistButtonProps {
  mediaId: number;
  mediaType: string;
  sessionId: string;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  mediaId,
  mediaType,
  sessionId
}) => {
  const { addToWatchlist } = useActions();
  const { id } = useTypedSelector(state => state.user.details);
  const { showPopover, setShowPopover } = usePopover();

  const handleClick = () => {
    if (sessionId.length > 0) {
      addToWatchlist({
        sessionId,
        watchlist: true,
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
      <button onClick={handleClick}>+</button>
      {showPopover && (
        <div>
          Please sign in <Link to="/login">here</Link> first
        </div>
      )}
    </div>
  );
};

export default WatchlistButton;
