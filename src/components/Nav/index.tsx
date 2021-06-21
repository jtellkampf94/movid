import { Link, useHistory } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./nav.scss";

const Nav: React.FC = () => {
  const state = useTypedSelector(state => state);
  const { id: accountId } = state.user.details;
  const { session_id } = state.auth.session;
  const { logOut } = useActions();
  const history = useHistory();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list-item">
          {accountId !== 0 ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </li>
        <li className="nav-list-item">
          <Link to="/discover">Discover</Link>
        </li>
        {accountId !== 0 && (
          <li className="nav-list-item">
            <span
              onClick={() => {
                logOut(session_id);
                history.push("/");
              }}
            >
              Log out
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
