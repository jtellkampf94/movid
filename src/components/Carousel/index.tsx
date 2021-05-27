import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./carousel.scss";

SwiperCore.use([Autoplay, Navigation]);

interface CarouselProps {
  items: MovieDetails[] | TVDetails[];
  baseUrl: string;
  sizes: string[];
}

const Carousel: React.FC<CarouselProps> = ({ baseUrl, sizes, items }) => {
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
              {/* <div className="swiper-slide-container">
                <h1 className="swiper-slide-title">
                  {item.title ? item.title : item.name}
                </h1>
              </div> */}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
