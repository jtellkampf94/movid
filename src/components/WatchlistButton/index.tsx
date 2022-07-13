import { Link } from "react-router-dom";
import { Fragment } from "react";

import { useActions } from "../../hooks/useActions";
import { usePopover } from "../../hooks/usePopover";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./watchlistButton.scss";

interface WatchlistButtonProps {
  mediaId: number;
  mediaType: string;
  sessionId: string;
  inWatchlist: boolean;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  mediaId,
  mediaType,
  sessionId,
  inWatchlist,
}) => {
  const { addToWatchlist } = useActions();
  const { id } = useTypedSelector((state) => state.user.details);
  const { showPopover, setShowPopover } = usePopover();

  const handleClick = () => {
    if (sessionId.length > 0) {
      addToWatchlist({
        sessionId,
        watchlist: true,
        accountId: id.toString(),
        mediaType,
        mediaId,
      });
    } else {
      setShowPopover(true);
    }
  };

  return (
    <div className="watchlist-button">
      {inWatchlist ? (
        <h1>'in watchlist'</h1>
      ) : (
        <Fragment>
          <button className="watchlist-button-button" onClick={handleClick}>
            +
          </button>
          {showPopover && (
            <div>
              Please sign in <Link to="/login">here</Link> first
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default WatchlistButton;
