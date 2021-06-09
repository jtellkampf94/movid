import { RouteComponentProps, useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import queryString from "query-string";

import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

import "./profile.scss";

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const { requestToken, loggedIn } = useTypedSelector(state => state.auth);
  const params = queryString.parse(location.search);
  const isApproved =
    loggedIn ||
    (params.approved && params.request_token === requestToken.request_token);

  const history = useHistory();
  const { clearRequestToken } = useActions();
  const state = useTypedSelector(state => state.auth);
  console.log(state);
  return (
    <Fragment>
      <Header />
      <div className="profile">
        {isApproved ? (
          <h1>Profile</h1>
        ) : (
          <div>
            <h1>Something went wrong. Please try logging in again...</h1>{" "}
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
