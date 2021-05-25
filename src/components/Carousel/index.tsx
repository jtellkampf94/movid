import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./carousel.scss";

SwiperCore.use([Autoplay, Navigation]);

const Carousel: React.FC = () => {
  const { secure_base_url: baseUrl, backdrop_sizes: sizes } = useTypedSelector(
    state => state.config.images.images
  );

  const movies = useTypedSelector(state => state.movies.nowPlaying.results);

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
      {movies.length > 1 &&
        movies.map(movie => {
          const srcUrl =
            baseUrl.length > 0 ? baseUrl + sizes[2] + movie.backdrop_path : "";
          return (
            <SwiperSlide key={movie.id}>
              <div
                className="swiper-slide-background"
                style={{ background: `url(${srcUrl})  no-repeat` }}
              >
                <div className="swiper-slide-container">
                  <h1 className="swiper-slide-title">{movie.title}</h1>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Carousel;
