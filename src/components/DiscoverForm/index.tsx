import { useState, useEffect } from "react";
import axios from "axios";
import SearchableDropdown from "../SearchableDropdown";
import Dropdown from "../Dropdown";
import { useActions } from "../../hooks/useActions";

import "./discoverForm.scss";

const sortByOptions = [
  { id: "popularity.desc", name: "Popularity Descending" },
  { id: "popularity.asc", name: "Popularity Ascending" },
  { id: "release_date.desc", name: "Release Date Descending" },
  { id: "release_date.asc", name: "Release Date Ascending" },
  { id: "revenue.desc", name: "Revenue Descending" },
  { id: "revenue.asc", name: "Revenue Ascending" },
  { id: "vote_average.desc", name: "Vote Average Descending" },
  { id: "vote_average.asc", name: "Vote Average Ascending" }
];

interface SearchedGenres {
  genres: { id: number; name: string }[];
}

interface DiscoverFormProps {
  page: string;
}

const DiscoverForm: React.FC<DiscoverFormProps> = ({ page }) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withPeople, setWithPeople] = useState<null | string>(null);
  const [withGenre, setWithGenre] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);

  const [genres, setGenres] = useState<SearchedGenres | null>(null);
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    getDiscoverMovies({
      sortBy,
      voteAverage,
      withPeople,
      withGenre,
      year,
      page
    });
  }, [page]);

  const loadOptions = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
      );
      setGenres(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { getDiscoverMovies } = useActions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getDiscoverMovies({
      sortBy,
      voteAverage,
      withPeople,
      withGenre,
      year,
      page
    });
  };

  return (
    <form onSubmit={handleSubmit} className="discover-form">
      <div className="discover-form-input-container">
        <Dropdown title="Sort By" items={sortByOptions} setState={setSortBy} />
      </div>
      {genres && (
        <div className="discover-form-input-container">
          <Dropdown
            items={genres.genres}
            title="Genres"
            setState={setWithGenre}
          />
        </div>
      )}
      <div className="discover-form-input-container">
        <SearchableDropdown setWithPeople={setWithPeople} />
      </div>

      <div className="discover-form-input-container">
        <input
          className="discover-form-input"
          onChange={e => setVoteAverage(e.target.value)}
          type="number"
          min="0"
          name="vote_average"
          value={voteAverage ? voteAverage : ""}
          placeholder="Vote Average"
        />
      </div>
      <div className="discover-form-input-container">
        <input
          className="discover-form-input"
          onChange={e => setYear(e.target.value)}
          type="number"
          min="0"
          name="year"
          value={year ? year : ""}
          placeholder="Year"
        />
      </div>
      <div className="discover-form-button-container">
        <button type="submit" className="discover-form-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default DiscoverForm;
