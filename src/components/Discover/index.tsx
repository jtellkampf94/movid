import { useState, Fragment } from "react";
import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import DiscoverForm from "../DiscoverForm";
import MovieCard from "../MovieCard";

import "./discover.scss";

const Discover: React.FC = () => {
  const [page, setPage] = useState(1);
  const state = useTypedSelector(state => state);
  const discover = state.movies.discover;
  const config = state.config;

  return (
    <div className="discover">
      <Header />
      <DiscoverForm page={page.toString()} />
      <div className="discover-search-results">
        {discover.total_results > 0 &&
          config.images &&
          config.movieGenres &&
          discover.results.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              movieGenres={config.movieGenres}
              secureBaseUrl={config.images.images.secure_base_url}
              posterSize={config.images.images.poster_sizes[2]}
            />
          ))}
      </div>
      <div className="discover-pagination">
        {discover.total_pages > 1 && (
          <Fragment>
            <button
              className="discover-pagination-button"
              onClick={() => setPage(prevStatePage => prevStatePage - 1)}
            >
              Previous
            </button>
            <div className="discover-pagination-page-info">
              {discover.page}/{discover.total_pages}
            </div>
            <button
              className="discover-pagination-button"
              onClick={() => setPage(prevStatePage => prevStatePage + 1)}
            >
              Next
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Discover;
