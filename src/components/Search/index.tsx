import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import MovieCard from "../MovieCard";
import Header from "../Header";
import Pagination from "../Pagination";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { usePagination } from "../../hooks/usePagination";
import {
  MovieResults,
  TVResults,
  PersonResults
} from "../../redux/reducers/search-reducer";

import "./search.scss";

interface Params {
  id: string;
}

const Search: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { page, previousPage, nextPage } = usePagination();
  const { search } = useActions();
  const state = useTypedSelector(state => state);
  const config = state.config;
  const { secure_base_url, poster_sizes, profile_sizes } = config.images.images;
  const {
    total_pages,
    total_results,
    results,
    page: pageOfResults
  } = state.search;

  useEffect(() => {
    search(match.params.id, page);
  }, []);

  let moviesArray: MovieResults[] = [];
  let tvArray: TVResults[] = [];
  let peopleArray: PersonResults[] = [];

  if (results.length > 0) {
    results.map(result => {
      if (result.media_type === "movie") {
        moviesArray.push(result);
      }

      if (result.media_type === "tv") {
        tvArray.push(result);
      }

      if (result.media_type === "person") {
        peopleArray.push(result);
      }
    });
  }

  return (
    <div className="search-page">
      <Header />
      <h2 className="search-page-heading">
        Search Results For "{match.params.id}"
      </h2>

      <h3 className="search-page-subheading">Movies Results</h3>
      <div className="search-page-results">
        {moviesArray.length > 0 &&
          moviesArray.map(movie => (
            <div key={movie.id} className="search-page-card-container">
              <MovieCard
                isTV={false}
                movie={movie}
                movieGenres={config.movieGenres}
                secureBaseUrl={secure_base_url}
                posterSize={poster_sizes[2]}
              />
            </div>
          ))}
      </div>

      <h3 className="search-page-subheading">TV Results</h3>
      <div className="search-page-results">
        {tvArray.length > 0 &&
          tvArray.map(tv => (
            <div key={tv.id} className="search-page-card-container">
              <MovieCard
                isTV={true}
                tv={tv}
                movieGenres={config.movieGenres}
                secureBaseUrl={secure_base_url}
                posterSize={poster_sizes[2]}
              />
            </div>
          ))}
      </div>

      <h3 className="search-page-subheading">People Results</h3>
      <div className="search-page-results">
        {peopleArray.length > 0 &&
          peopleArray.map(person => (
            <div key={person.id} className="search-page-card-container">
              <div
                className="search-page-person-card"
                style={{
                  background: `url(${secure_base_url +
                    profile_sizes[1] +
                    person.profile_path})`
                }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
