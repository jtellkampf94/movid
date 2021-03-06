import { Fragment, useEffect } from "react";
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
import PeopleCard from "../PeopleCard";

interface Params {
  id: string;
}

const Search: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { page, previousPage, nextPage } = usePagination();
  const { search } = useActions();
  const state = useTypedSelector(state => state);
  const config = state.config;
  const { secure_base_url, poster_sizes, profile_sizes } = config.images.images;
  const { total_pages, total_results, results } = state.search;

  useEffect(() => {
    search(match.params.id, page);
  }, [page]);

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
      <div className="search-page-details">
        <h2 className="search-page-details-heading">
          Search Results For "{match.params.id}"
        </h2>
        <p className="search-page-details-info">
          {total_results} results matching your search
          {total_pages > 1 && (
            <Fragment>
              , page {page} of {total_pages}
            </Fragment>
          )}
        </p>
      </div>

      {moviesArray.length > 0 ? (
        <Fragment>
          <h3 className="search-page-subheading">Movies Results</h3>
          <div className="search-page-results">
            {moviesArray.map(movie => (
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
        </Fragment>
      ) : (
        <div className="search-page-no-results">
          No Movies matched your search term{" "}
          {total_pages > 1 && <Fragment>on current page</Fragment>}
        </div>
      )}

      {tvArray.length > 0 ? (
        <Fragment>
          <h3 className="search-page-subheading">TV Results</h3>
          <div className="search-page-results">
            {tvArray.map(tv => (
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
        </Fragment>
      ) : (
        <div className="search-page-no-results">
          No TV shows matched your search term{" "}
          {total_pages > 1 && <Fragment>on current page</Fragment>}
        </div>
      )}

      {peopleArray.length > 0 ? (
        <Fragment>
          <h3 className="search-page-subheading">People Results</h3>
          <div className="search-page-results">
            {peopleArray.map(person => {
              const backgroundURL = person.profile_path
                ? secure_base_url + profile_sizes[1] + person.profile_path
                : null;
              return (
                <div key={person.id} className="search-page-card-container">
                  <PeopleCard person={person} backgroundURL={backgroundURL} />
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <div className="search-page-no-results">
          No people matched your search term{" "}
          {total_pages > 1 && <Fragment>on current page</Fragment>}
        </div>
      )}

      {total_pages > 1 && (
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={page}
          totalPages={total_pages}
        />
      )}
    </div>
  );
};

export default Search;
