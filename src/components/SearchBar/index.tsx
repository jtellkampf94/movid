import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import "./search-bar.scss";

const SearchBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    if (isSmallScreen) setIsActive(true);
  }, [isSmallScreen]);

  return (
    <div className={`search-bar ${isActive ? "search-bar__active" : ""}`}>
      <form className="search-bar__form">
        <input
          type="text"
          name="input"
          className={`search-bar__input--circle ${
            isActive ? "search-bar__input--rectangle" : ""
          }`}
        />
        <button
          type="reset"
          className={`search-bar__button ${
            isActive ? "search-bar__close-icon" : ""
          }`}
          onClick={() => setIsActive(!isActive)}
        ></button>
      </form>
    </div>
  );
};

export default SearchBar;
