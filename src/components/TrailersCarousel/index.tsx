import { useRef, useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Trailers } from "../../redux/reducers/details-reducer";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./trailersCarousel.scss";

import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

interface TrailersCarouselProps {
  trailers: Trailers["results"];
}

const TrailersCarousel: React.FC<TrailersCarouselProps> = ({ trailers }) => {
  return (
    <Fragment>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        className="mySwiper"
      >
        {trailers.length > 0 &&
          trailers.map(trailer => (
            <SwiperSlide key={trailer.id}>
              <iframe
                className="swiper-slide-iframe"
                title="1"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
              ></iframe>
            </SwiperSlide>
          ))}
      </Swiper>
    </Fragment>
  );
};

export default TrailersCarousel;
