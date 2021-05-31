import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

import { MovieGenreConfig } from "../../redux/reducers/config-reducer";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./carousel.scss";
import StarRating from "../StarRating";

SwiperCore.use([Autoplay, Navigation]);

interface CarouselProps {
  items: MovieDetails[] | TVDetails[];
  baseUrl: string;
  sizes: string[];
  isTV: boolean;
  genres: MovieGenreConfig["genres"];
}

const Carousel: React.FC<CarouselProps> = ({
  baseUrl,
  sizes,
  items,
  isTV,
  genres
}) => {
  const history = useHistory();

  const mapGenre = (genreId: number) => {
    const genreArray = genres.filter(genre => genre.id === genreId);
    const genre = genreArray[0] ? genreArray[0].name : "";
    return genre;
  };
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
      {items.map((item: TVDetails | MovieDetails) => {
        const srcUrl =
          baseUrl.length > 0 ? baseUrl + sizes[2] + item.backdrop_path : "";
        return (
          <SwiperSlide key={item.id}>
            <div
              className="swiper-slide-background"
              style={{
                backgroundImage: `url(${srcUrl})`
              }}
            >
              <div
                className="swiper-slide-overlay"
                onClick={() =>
                  history.push(`/details/${isTV ? "tv" : "movie"}/${item.id}`)
                }
              >
                <div className="swiper-slide-container">
                  <h1 className="swiper-slide-title">
                    {item.title ? item.title : item.name}
                  </h1>
                  <div className="swiper-slide-home-details">
                    <span className="swiper-slider-genre">
                      {item.genre_ids[0] && mapGenre(item.genre_ids[0])} |
                    </span>
                    <span className="swiper-slide-rating">
                      {item.vote_average}
                    </span>
                    <StarRating rating={item.vote_average} />
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
