import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Carousel from "../Carousel";
import Header from "../Header";
import MoviesCarousel from "../MoviesCarousel";

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

  const {
    secure_base_url,
    backdrop_sizes,
    poster_sizes
  } = state.config.images.images;
  const {
    nowPlaying: nowPlayingMovies,
    upcoming: upcomingMovies,
    topRated: topRatedMovies,
    popular: popularMovies
  } = state.movies;
  const {
    airingToday,
    popular: popularTV,
    onTheAir,
    topRated: topRatedTV
  } = state.tv;

  return (
    <div className="home">
      <Header />
      {isTV && airingToday.results.length > 0 && (
        <Carousel
          genres={state.config.movieGenres.genres}
          isTV={isTV}
          tv={airingToday.results}
          baseUrl={secure_base_url}
          sizes={backdrop_sizes}
        />
      )}
      {!isTV && nowPlayingMovies.results.length > 0 && (
        <Carousel
          genres={state.config.movieGenres.genres}
          isTV={isTV}
          movies={nowPlayingMovies.results}
          baseUrl={secure_base_url}
          sizes={backdrop_sizes}
        />
      )}
      <div className="home-main-content">
        <div className="home-buttons-container">
          <button className="home-buttons" onClick={() => setIsTV(false)}>
            <i className="home-buttons-icon fas fa-film"></i>
            <span className="home-buttons-text">Movie</span>
          </button>
          <button className="home-buttons" onClick={() => setIsTV(true)}>
            <i className="home-buttons-icon fas fa-tv"></i>
            <span className="home-buttons-text">TV</span>
          </button>
        </div>

        <div className="home-carousel-container home-upcoming">
          <h2 className="home-title home-title-upcoming">
            {isTV ? "Airing Today" : "Upcoming"}
          </h2>
          {!isTV && upcomingMovies.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              movies={upcomingMovies.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
          {isTV && airingToday.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              tv={airingToday.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
        </div>

        <div className="home-carousel-container home-popular">
          <h2 className="home-title">Popular</h2>
          {!isTV && popularMovies.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              movies={popularMovies.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
          {isTV && popularTV.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              tv={popularTV.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
        </div>

        <div className="home-carousel-container home-now-playing">
          <h2 className="home-title">{isTV ? "On The Air" : "Now Playing"}</h2>
          {!isTV && nowPlayingMovies.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              movies={nowPlayingMovies.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
          {isTV && onTheAir.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              tv={onTheAir.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
        </div>

        <div className="home-carousel-container home-top-rated">
          <h2 className="home-title">Top Rated</h2>
          {!isTV && topRatedMovies.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              movies={topRatedMovies.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
          {isTV && topRatedTV.results.length > 0 && (
            <MoviesCarousel
              movieGenres={state.config.movieGenres}
              isTV={isTV}
              tv={topRatedTV.results}
              secureBaseURL={secure_base_url}
              posterSize={poster_sizes[2]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
