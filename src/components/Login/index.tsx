import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./login.scss";

const Login: React.FC = () => {
  const { requestToken } = useActions();
  const { requestToken: reqToken } = useTypedSelector(state => state.auth);
  const reqTokenExpAt =
    reqToken.request_token.length > 0 ? new Date(reqToken.expires_at) : true;

  useEffect(() => {
    if (reqTokenExpAt && new Date() > reqTokenExpAt) {
      requestToken();
    }
  }, []);

  const history = useHistory();

  console.log(reqTokenExpAt);
  return (
    <div className="login">
      <h1>Login</h1>
      <button
        onClick={() =>
          history.push(
            `https://www.themoviedb.org/authenticate/${reqToken.request_token}?redirect_to=${process.env.REACT_APP_DOMAIN}/profile`
          )
        }
      >
        LOG IN
      </button>
    </div>
  );
};

export default Login;
