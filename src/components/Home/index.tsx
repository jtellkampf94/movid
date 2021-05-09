import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import Carousel from "../Carousel";
import Header from "../Header";

const Home: React.FC = () => {
  const {
    getUpcomingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies
  } = useActions();

  useEffect(() => {
    getUpcomingMovies();
    getPopularMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <Header />
      <Carousel />
    </div>
  );
};

export default Home;
