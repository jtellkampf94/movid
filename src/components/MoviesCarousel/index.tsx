import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./moviesCarousel.scss";

import SwiperCore, { Navigation } from "swiper/core";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";
import { MovieGenreConfig } from "../../redux/reducers/config-reducer";
import MovieCard from "../MovieCard";

SwiperCore.use([Navigation]);

type MovieCarouselProps =
  | {
      isTV: false;
      movies: MovieDetails[];
      secureBaseURL: string;
      movieGenres: MovieGenreConfig;
      posterSize: string;
    }
  | {
      isTV: true;
      tv: TVDetails[];
      secureBaseURL: string;
      movieGenres: MovieGenreConfig;
      posterSize: string;
    };

const MovieCarousel: React.FC<MovieCarouselProps> = props => {
  const firstBP = useMediaQuery({ query: "(max-width: 1220px)" });
  const secondBP = useMediaQuery({ query: "(max-width: 1025px)" });
  const thirdBP = useMediaQuery({ query: "(max-width: 820px)" });
  const fourthBP = useMediaQuery({ query: "(max-width: 615px)" });
  const fifthBP = useMediaQuery({ query: "(max-width: 420px)" });

  let slidesPerView = 6;
  if (firstBP) {
    slidesPerView = 5;
  }
  if (firstBP && secondBP) {
    slidesPerView = 4;
  }
  if (firstBP && secondBP && thirdBP) {
    slidesPerView = 3;
  }
  if (firstBP && secondBP && thirdBP && fourthBP) {
    slidesPerView = 2;
  }
  if (firstBP && secondBP && thirdBP && fourthBP && fifthBP) {
    slidesPerView = 1;
  }

  return (
    <Fragment>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={0}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        className="mySwiper movies-carousel"
      >
        {props.isTV
          ? props.tv.map(tvItem => (
              <SwiperSlide className="movies-carousel-slide" key={tvItem.id}>
                <MovieCard
                  movieGenres={props.movieGenres}
                  isTV={true}
                  tv={tvItem}
                  secureBaseUrl={props.secureBaseURL}
                  posterSize={props.posterSize}
                />
              </SwiperSlide>
            ))
          : props.movies.map(movie => (
              <SwiperSlide className="movies-carousel-slide" key={movie.id}>
                <MovieCard
                  movieGenres={props.movieGenres}
                  isTV={false}
                  movie={movie}
                  secureBaseUrl={props.secureBaseURL}
                  posterSize={props.posterSize}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </Fragment>
  );
};

export default MovieCarousel;
