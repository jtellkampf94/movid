import { useState, Fragment } from "react";

import Header from "../Header";
import DiscoverForm from "../DiscoverForm";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { usePagination } from "../../hooks/usePagination";

import "./discover.scss";

const Discover: React.FC = () => {
  const state = useTypedSelector(state => state);
  const discover = state.movies.discover;
  const config = state.config;

  const { page, previousPage, nextPage } = usePagination();

  return (
    <div className="discover">
      <Header />
      <div className="discover-heading">
        <h1 className="discover-heading-title">Discover</h1>
      </div>
      <DiscoverForm page={page.toString()} />
      <div className="discover-search-results">
        {discover.total_results > 0 &&
          config.images &&
          config.movieGenres &&
          discover.results.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isTV={false}
              movieGenres={config.movieGenres}
              secureBaseUrl={config.images.images.secure_base_url}
              posterSize={config.images.images.poster_sizes[2]}
            />
          ))}
      </div>

      {discover.total_pages > 1 && (
        <Pagination
          currentPage={discover.page}
          totalPages={discover.total_pages}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};

export default Discover;
