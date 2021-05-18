import React, { useState, useRef } from "react";
import axios from "axios";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./searchableDropdown.scss";

interface SearchedPeople {
  page: number;
  results: {
    adult: boolean;
    gender: number;
    id: number;
    known_for: MovieDetails[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
  }[];
  total_pages: number;
  total_results: number;
}

interface SearchableDropdownProps {
  setWithPeople: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  setWithPeople
}) => {
  const key = process.env.REACT_APP_API_KEY;

  const [options, setOptions] = useState<SearchedPeople | null>(null);
  const [optionName, setOptionName] = useState("");
  const ref = useRef(null);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      setOptionName(e.target.value);
      if (e.target.value) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        );

        setOptions(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (person: SearchedPeople["results"][0]) => {
    setWithPeople(person.id.toString());
    setOptionName(person.name);
    setOptions(null);
  };

  const handleClickOutside = () => {
    setOptions(null);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      className="searchable-dropdown"
      ref={ref}
      onClick={e => e.stopPropagation()}
    >
      <div className="searchable-dropdown-search-box">
        <i
          className={`searchable-dropdown-search-icon fas fa-search ${
            options ? "active" : ""
          }`}
        ></i>
        <input
          className="searchable-dropdown-input"
          type="text"
          placeholder="Search people involved"
          onChange={handleChange}
          value={optionName}
        />
      </div>
      <ul className={`searchable-dropdown-list ${optionName ? "active" : ""}`}>
        {options?.results.map(person => (
          <li
            className="searchable-dropdown-list-item"
            key={person.id}
            onClick={() => handleClick(person)}
          >
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchableDropdown;
