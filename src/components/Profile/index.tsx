import { RouteComponentProps, Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import queryString from "query-string";

import Header from "../Header";

import "./profile.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const { requestToken } = useTypedSelector(state => state.auth);
  const params = queryString.parse(location.search);
  const isApproved =
    params.approved && params.request_token === requestToken.request_token;
  return (
    <Fragment>
      <Header />
      <div className="profile">
        {isApproved ? (
          <h1>Profile</h1>
        ) : (
          <div>
            <h1>Something went wrong. Please try logging in again...</h1>{" "}
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Profile;
