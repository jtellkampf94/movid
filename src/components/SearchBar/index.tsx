import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./search-bar.scss";

const SearchBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const history = useHistory();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    if (isSmallScreen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isSmallScreen]);

  const handleClickOutside = () => {
    if (!isSmallScreen) {
      setIsActive(false);
    }
  };

  const handleOnEnterPressed = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.keyCode === 13 || e.which === 13) {
      setValue("");
      history.push(`/search/${value}`);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      className={`search-bar ${
        isActive ? "search-bar__active" : "search-bar__inactive"
      }`}
      ref={ref}
    >
      <form className="search-bar__form">
        <input
          type="text"
          name="input"
          placeholder="Search..."
          className={`search-bar__input--circle ${
            isActive ? "search-bar__input--rectangle" : ""
          }`}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={handleOnEnterPressed}
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
