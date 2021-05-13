import React, { useState } from "react";
import axios from "axios";
import { SearchedPeople } from "../../redux/reducers/movies-reducer";

interface SearchableDropdownProps {
  setWithPeople: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  setWithPeople
}) => {
  const key = "1ded79dbc2a8dfdb74aafb044ce26713";

  const [options, setOptions] = useState<SearchedPeople | null>(null);
  const [optionName, setOptionName] = useState("");

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

  return (
    <div className="discover-form__dropdown">
      <input
        type="text"
        placeholder="Search people involved"
        onChange={handleChange}
        value={optionName}
      />
      {options?.results.map(person => (
        <div
          className="discover-form__dropdown-options"
          key={person.id}
          onClick={() => {
            setWithPeople(person.id.toString());
            setOptionName(person.name);
            setOptions(null);
          }}
        >
          {person.name}
        </div>
      ))}
    </div>
  );
};

export default SearchableDropdown;
