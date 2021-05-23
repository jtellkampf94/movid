import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import DiscoverForm from "../DiscoverForm";
import MovieCard from "../MovieCard";

import "./discover.scss";

const Discover: React.FC = () => {
  const state = useTypedSelector(state => state);
  const discover = state.movies.discover;
  const config = state.config;

  return (
    <div className="discover">
      <Header />
      <DiscoverForm />
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
    </div>
  );
};

export default Discover;
