import { Link } from "react-router-dom";

import "./nav.scss";

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/discover">Discover</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
