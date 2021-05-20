import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MovieCard from "../MovieCard";

const Profile: React.FC = () => {
  const [state, setState] = useState<null | string>("");
  const { getNowPlayingMovies } = useActions();

  useEffect(() => {
    getNowPlayingMovies();
  });
  const movies = useTypedSelector(state => state.movies.nowPlaying);
  const config = useTypedSelector(state => state.config.images);

  return (
    <div style={{ display: "flex", width: "100vw" }}>
      {movies.results.map(movie => (
        <MovieCard
          secureBaseUrl={config.secure_base_url}
          posterSize={config.poster_sizes[1]}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default Profile;
