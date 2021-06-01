import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

import { MovieGenreConfig } from "../../redux/reducers/config-reducer";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./carousel.scss";
import StarRating from "../StarRating";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";
import React from "react";

SwiperCore.use([Autoplay, Navigation]);

type CarouselProps =
  | {
      movies: MovieDetails[];
      baseUrl: string;
      sizes: string[];
      isTV: false;
      genres: MovieGenreConfig["genres"];
    }
  | {
      tv: TVDetails[];
      baseUrl: string;
      sizes: string[];
      isTV: true;
      genres: MovieGenreConfig["genres"];
    };

const Carousel: React.FC<CarouselProps> = props => {
  const mapGenre = (genreId: number) => {
    const genreArray = props.genres.filter(genre => genre.id === genreId);
    const genre = genreArray[0] ? genreArray[0].name : "";
    return genre;
  };

  const history = useHistory();

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false
      }}
      navigation={true}
      className="swiper"
    >
      {props.isTV
        ? props.tv.map(tvItem => {
            const srcUrl =
              props.baseUrl.length > 0
                ? props.baseUrl + props.sizes[2] + tvItem.backdrop_path
                : "";
            return (
              <SwiperSlide>
                <div
                  className="swiper-slide-background"
                  style={{
                    backgroundImage: `url(${srcUrl})`
                  }}
                >
                  <div
                    className="swiper-slide-overlay"
                    onClick={() => history.push(`/details/tv/${tvItem.id}`)}
                  >
                    <div className="swiper-slide-container">
                      <h1 className="swiper-slide-title">{tvItem.name}</h1>
                      <div className="swiper-slide-home-details">
                        <span className="swiper-slider-genre">
                          {tvItem.genre_ids[0] && mapGenre(tvItem.genre_ids[0])}{" "}
                          |
                        </span>
                        <span className="swiper-slide-rating">
                          {tvItem.vote_average}
                        </span>
                        <StarRating rating={tvItem.vote_average} />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        : props.movies.map(movie => {
            const srcUrl =
              props.baseUrl.length > 0
                ? props.baseUrl + props.sizes[2] + movie.backdrop_path
                : "";
            return (
              <SwiperSlide>
                <div
                  className="swiper-slide-background"
                  style={{
                    backgroundImage: `url(${srcUrl})`
                  }}
                >
                  <div
                    className="swiper-slide-overlay"
                    onClick={() => history.push(`/details/movie/${movie.id}`)}
                  >
                    <div className="swiper-slide-container">
                      <h1 className="swiper-slide-title">{movie.title}</h1>
                      <div className="swiper-slide-home-details">
                        <span className="swiper-slider-genre">
                          {movie.genre_ids[0] && mapGenre(movie.genre_ids[0])} |
                        </span>
                        <span className="swiper-slide-rating">
                          {movie.vote_average}
                        </span>
                        <StarRating rating={movie.vote_average} />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};

export default Carousel;
