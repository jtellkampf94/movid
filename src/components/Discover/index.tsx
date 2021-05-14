import axios from "axios";
import React, { useState } from "react";
import SearchableDropdown from "../SearchableDropdown";
import Header from "../Header";

import "./discover.scss";
import Dropdown from "../Dropdown";

const Discover: React.FC = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState<null | string>(null);
  const [withPeople, setWithPeople] = useState<null | string>(null);
  const [withGenre, setWithGenre] = useState<null | string>(null);
  const [withKeywords, setWithKeywords] = useState<null | string>(null);
  const [year, setYear] = useState<null | string>(null);
  const [page, setPage] = useState("1");

  const key = process.env.REACT_APP_API_KEY;

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&${
    voteAverage ? `vote_average.gte=${voteAverage}&` : ""
  }${withGenre ? `with_genres=${withGenre}&` : ""}${
    withPeople ? `with_people=${withPeople}&` : ""
  }${year ? `primary_release_year=${year}` : ""}`;

  const search = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    );

    console.log(data);
  };

  console.log(withGenre);

  return (
    <div className="discover">
      <Header />
      <form className="discover-form">
        <button type="button" onClick={search}>
          NOW
        </button>
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

        {/* <input
          className="discover-form__input"
          onChange={e => setWithGenre(e.target.value)}
          type="text"
          name="with_genres"
          value={withGenre?.toString()}
          placeholder="Genres"
        /> */}
        <Dropdown setState={setWithGenre} />
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
