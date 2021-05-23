import { useState, useEffect, Fragment } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header";
import MovieCard from "../MovieCard";

import "./profile.scss";

const Profile: React.FC = () => {
  const [state, setState] = useState<null | string>("");
  const { getNowPlayingMovies } = useActions();

  useEffect(() => {
    getNowPlayingMovies();
  });
  const movies = useTypedSelector(state => state.movies.nowPlaying);
  const config = useTypedSelector(state => state.config);

  return (
    <Fragment>
      <Header />
      <div className="profile">
        {movies.results.map(movie => (
          <MovieCard
            movieGenres={config.movieGenres}
            secureBaseUrl={config.images.images.secure_base_url}
            posterSize={config.images.images.poster_sizes[2]}
            movie={movie}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Profile;
