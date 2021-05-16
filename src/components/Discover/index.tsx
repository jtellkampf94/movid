import React, { useState } from "react";
import SearchableDropdown from "../SearchableDropdown";
import Header from "../Header";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./discover.scss";
import Dropdown from "../Dropdown";
import Select from "../Select";
import Option from "../Option";

const Discover: React.FC = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withPeople, setWithPeople] = useState<null | string>(null);
  const [withGenre, setWithGenre] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);
  const [page, setPage] = useState("1");

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
        {/* <select
          className="discover-form__select"
          name="sort_by"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option className="discover-form__option" value="popularity.desc">
            Popularity Descending
          </option>
          <option className="discover-form__option" value="popularity.asc">
            Popularity Ascending
          </option>
          <option className="discover-form__option" value="release_date.desc">
            Release Date Descending
          </option>
          <option className="discover-form__option" value="release_date.asc">
            Release Date Ascending
          </option>
          <option className="discover-form__option" value="revenue.desc">
            Revenue Descending
          </option>
          <option className="discover-form__option" value="revenue.asc">
            Revenue Ascending
          </option>
          <option className="discover-form__option" value="vote_average.desc">
            Vote Average Descending
          </option>
          <option className="discover-form__option" value="vote_average.asc">
            Vote Average Ascending
          </option>
        </select> */}

        <Select placeholder="Sort By...">
          <Option name="sort_by" id="vote_average.asc" label="Vote Average" />
        </Select>
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
        <Dropdown setState={setWithGenre} />
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
