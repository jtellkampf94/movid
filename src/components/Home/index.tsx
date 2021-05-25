import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import Carousel from "../Carousel";
import Header from "../Header";

import "./home.scss";

const Home: React.FC = () => {
  const [isTV, setIsTV] = useState(false);

  const {
    getUpcomingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies
  } = useActions();

  useEffect(() => {
    if (isTV) {
    } else {
      getUpcomingMovies();
      getPopularMovies();
      getTopRatedMovies();
      getNowPlayingMovies();
    }
  }, [isTV]);

  const state = useTypedSelector(state => state);

  const { secure_base_url, backdrop_sizes } = state.config.images.images;
  const { results: moviesNowPlaying } = state.movies.nowPlaying;

  let items: [] | MovieDetails[];
  if (isTV) {
    items = [];
  } else {
    items = moviesNowPlaying;
  }

  return (
    <div className="home">
      <Header />
      {items.length > 0 && (
        <Carousel
          items={items}
          baseUrl={secure_base_url}
          sizes={backdrop_sizes}
        />
      )}
      <div className="home-buttons">
        <button onClick={() => setIsTV(false)}>Movie</button>
        <button onClick={() => setIsTV(true)}>TV</button>
      </div>
    </div>
  );
};

export default Home;
