import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchableDropdown from "../SearchableDropdown";
import Header from "../Header";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./discover.scss";
import Dropdown from "../Dropdown";

const sortByOptions = [
  { id: 1, name: "popularity.desc" },
  { id: 2, name: "popularity.asc" },
  { id: 3, name: "release_date.desc" },
  { id: 4, name: "release_date.asc" },
  { id: 5, name: "revenue.desc" },
  { id: 6, name: "revenue.asc" },
  { id: 7, name: "vote_average.desc" },
  { id: 8, name: "vote_average.asc" }
];

interface SearchedGenres {
  genres: { id: number; name: string }[];
}

const Discover: React.FC = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withPeople, setWithPeople] = useState<null | string>(null);
  const [withGenre, setWithGenre] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);
  const [page, setPage] = useState("1");

  const [genres, setGenres] = useState<SearchedGenres | null>(null);
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    loadOptions();
  }, []);

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

  const state = useTypedSelector(state => state.movies.discover);

  console.log(state);

  return (
    <div className="discover">
      <Header />
      <form onSubmit={handleSubmit} className="discover-form">
        <Dropdown title="SortBy" items={sortByOptions} />

        {genres && <Dropdown items={genres.genres} title="Genres" />}

        <SearchableDropdown setWithPeople={setWithPeople} />
        <input
          className="discover-form__input"
          onChange={e => setVoteAverage(e.target.value)}
          type="number"
          min="0"
          name="vote_average"
          value={voteAverage?.toString()}
          placeholder="Vote Average"
        />

        <input
          className="discover-form__input"
          onChange={e => setYear(e.target.value)}
          type="number"
          min="0"
          name="year"
          value={year?.toString()}
          placeholder="Year"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Discover;
