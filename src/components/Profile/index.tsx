import { RouteComponentProps, useHistory } from "react-router-dom";
import { useEffect, Fragment } from "react";
import queryString from "query-string";

import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

import "./profile.scss";
import ProfileDashboard from "../ProfileDashboard";

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const state = useTypedSelector(state => state);
  const { requestToken, loggedIn, session } = state.auth;
  const { details } = state.user;

  const {
    clearRequestToken,
    createSession,
    logOut,
    getUserDetails,
    getRatedMovies,
    getRatedTV,
    getFavoriteMovies,
    getFavoriteTV,
    getMovieWatchlist,
    getTVWatchlist
  } = useActions();
  const history = useHistory();

  const params = queryString.parse(location.search);

  const isTokenExp =
    requestToken.expires_at.length > 0
      ? new Date() > new Date(requestToken.expires_at)
      : true;
  const isTokenApproved =
    params.approved &&
    params.request_token === requestToken.request_token &&
    !isTokenExp;
  const isApproved = loggedIn || isTokenApproved;

  useEffect(() => {
    if (isTokenApproved && !loggedIn) {
      createSession(requestToken.request_token);
    }
  }, []);

  useEffect(() => {
    if (session.session_id.length > 0 && details.id === 0) {
      getUserDetails(session.session_id);
    }
  }, [session.session_id, details.id]);

  useEffect(() => {
    if (details.id !== 0) {
      const sessionId = session.session_id;
      const accountId = details.id.toString();
      getRatedMovies(sessionId, accountId);
      getRatedTV(sessionId, accountId);
      getFavoriteMovies(sessionId, accountId);
      getFavoriteTV(sessionId, accountId);
      getMovieWatchlist(sessionId, accountId);
      getTVWatchlist(sessionId, accountId);
    }
  }, [details.id]);

  console.log(state);

  const handleLogOut = () => {
    logOut(session.session_id);
    history.push("/login");
  };

  return (
    <Fragment>
      <Header />
      <div className="profile">
        {isApproved ? (
          <ProfileDashboard handleLogOut={handleLogOut} />
        ) : (
          <div>
            <h1>
              {isTokenExp
                ? "Request token has expired."
                : "Something went wrong."}{" "}
              Please try logging in again...
            </h1>{" "}
            <button
              onClick={() => {
                clearRequestToken();
                history.push("/login");
              }}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Profile;
