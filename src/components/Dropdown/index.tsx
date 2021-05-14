import React, { useState, useEffect } from "react";
import axios from "axios";

interface SearchedGenres {
  genres: { id: number; name: string }[];
}

interface DropdownProps {
  setState: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setState }) => {
  const key = process.env.REACT_APP_API_KEY;

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<SearchedGenres | null>(null);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
      );
      setOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input placeholder="Genre" value={genreName} disabled type="text" />
      <button type="button" onClick={() => setShowOptions(!showOptions)}>
        v
      </button>
      {showOptions &&
        options?.genres.map(genre => (
          <div
            key={genre.id}
            onClick={() => {
              setGenreName(genre.name);
              setState(genre.id.toString());
              setShowOptions(false);
            }}
            style={{ backgroundColor: "white" }}
          >
            {genre.name}
          </div>
        ))}
    </div>
  );
};

export default Dropdown;
