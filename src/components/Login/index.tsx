import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header";
import NewStarRating from "../StarRating";
import "./login.scss";

const Login: React.FC = () => {
  const { requestToken } = useActions();
  const { requestToken: reqToken } = useTypedSelector(state => state.auth);
  const reqTokenExpAt =
    reqToken.request_token.length > 0 ? new Date(reqToken.expires_at) : true;

  useEffect(() => {
    if (reqTokenExpAt && new Date() > reqTokenExpAt) {
      requestToken();
      console.log("ran");
    }
  }, []);

  const state = useTypedSelector(state => state);
  console.log(state);

  return (
    <div className="login">
      <Header />
      <div className="login-contents">
        <h1>Login</h1>
        <button
          onClick={() =>
            (window.location.href = `https://www.themoviedb.org/authenticate/${reqToken.request_token}?redirect_to=${process.env.REACT_APP_DOMAIN}/profile`)
          }
        >
          LOG IN
        </button>
        <NewStarRating active={true} rating={9} />
      </div>
    </div>
  );
};

export default Login;
