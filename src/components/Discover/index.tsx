import axios from "axios";
import React, { useState } from "react";
import { SearchedPeople } from "../../redux/reducers/movies-reducer";
import Dropdown from "../Dropdown";
import Header from "../Header";

import "./discover.scss";

const Discover: React.FC = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withPeople, setWithPeople] = useState<null | string>(null);
  const [withGenres, setWithGenres] = useState<null | string>(null);
  const [withKeywords, setWithKeywords] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);
  const [page, setPage] = useState("1");

  const key = "1ded79dbc2a8dfdb74aafb044ce26713";

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&${
    voteAverage ? `vote_average.gte=${voteAverage}&` : ""
  }${withGenres ? `with_genres=${withGenres}&` : ""}${
    withPeople ? `with_people=${withPeople}&` : ""
  }${year ? `primary_release_year=${year}` : ""}`;

  return (
    <div className="discover">
      <Header />
      <form className="discover-form">
        <select
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
        </select>
        <Dropdown setWithPeople={setWithPeople} />
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
          onChange={e => setWithGenres(e.target.value)}
          type="text"
          name="with_genres"
          value={withGenres?.toString()}
          placeholder="Genres"
        />
        <input
          className="discover-form__input"
          onChange={e => setWithKeywords(e.target.value)}
          type="text"
          name="with_keywords"
          value={withKeywords?.toString()}
          placeholder="Keywords"
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
      </form>

      <button
        type="submit"
        onClick={async e => {
          e.preventDefault();

          console.log(url);
          const { data } = await axios.get(url);
          console.log(data);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Discover;
