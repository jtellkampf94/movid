import { RouteComponentProps, useHistory } from "react-router-dom";
import { useEffect, Fragment } from "react";
import queryString from "query-string";

import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

import "./profile.scss";

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const { requestToken, loggedIn, session } = useTypedSelector(
    state => state.auth
  );
  const { clearRequestToken, createSession, deleteSession } = useActions();
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

  return (
    <Fragment>
      <Header />
      <div className="profile">
        {isApproved ? (
          <h1>Profile</h1>
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
