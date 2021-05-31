import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";
import Carousel from "../Carousel";
import Header from "../Header";

import "./home.scss";

const Home: React.FC = () => {
  const [isTV, setIsTV] = useState(false);

  const {
    getUpcomingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getTVAiringToday,
    getPopularTV,
    getTVOnTheAir,
    getTopRatedTV
  } = useActions();

  useEffect(() => {
    if (isTV) {
      getTVAiringToday();
      getPopularTV();
      getTVOnTheAir();
      getTopRatedTV();
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
  const { results: tvAiringToday } = state.tv.airingToday;

  let items: TVDetails[] | MovieDetails[];
  if (isTV) {
    items = tvAiringToday;
  } else {
    items = moviesNowPlaying;
  }

  return (
    <div className="home">
      <Header />
      {items.length > 0 && (
        <Carousel
          genres={state.config.movieGenres.genres}
          isTV={isTV}
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
