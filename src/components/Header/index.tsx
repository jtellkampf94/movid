import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SearchBar from "../SearchBar";
import Nav from "../Nav";
import logo from "../../assets/images/logo.png";

import "./header.scss";

const Header: React.FC = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <header className="main-header">
      <Link to="/">
        <div className="main-header__brand">
          <img className="main-header__logo" src={logo} alt="logo" />
          <span className="main-header__title">MOVID</span>
        </div>
      </Link>

      <div
        className={`main-header__nav-collapse ${isActive ? "is-active" : ""}`}
      >
        <SearchBar />
        <Nav />
      </div>
      {isSmallScreen && (
        <div
          className={`hamburger ${isActive ? "is-active" : ""}`}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
      )}
    </header>
  );
};

export default Header;
