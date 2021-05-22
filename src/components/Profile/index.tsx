import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header";
import MovieCard from "../MovieCard";

const Profile: React.FC = () => {
  const [state, setState] = useState<null | string>("");
  const { getNowPlayingMovies } = useActions();

  useEffect(() => {
    getNowPlayingMovies();
  });
  const movies = useTypedSelector(state => state.movies.nowPlaying);
  const config = useTypedSelector(state => state.config);

  return (
    <div>
      {movies.results.map(movie => (
        <MovieCard
          movieGenres={config.movieGenres}
          secureBaseUrl={config.images.images.secure_base_url}
          posterSize={config.images.images.poster_sizes[2]}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default Profile;
