import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
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
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1000px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const isExtraSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isExtraExtraSmallScreen = useMediaQuery({
    query: "(max-width: 400px)"
  });

  let slidesPerView = 2;
  let spaceBetween = 20;
  let height = "315px";
  if (isMediumScreen) {
    height = "295px";
  }

  if (isMediumScreen && isSmallScreen) {
    height = "250px";
    spaceBetween = 10;
  }

  if (isMediumScreen && isSmallScreen && isExtraSmallScreen) {
    slidesPerView = 1;
    height = "315px";
    spaceBetween = 10;
  }

  if (
    isMediumScreen &&
    isSmallScreen &&
    isExtraSmallScreen &&
    isExtraExtraSmallScreen
  ) {
    slidesPerView = 1;
    height = "250px";
    spaceBetween = 10;
  }

  return (
    <Fragment>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
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
                height={height}
                src={`https://www.youtube.com/embed/${trailer.key}`}
              ></iframe>
            </SwiperSlide>
          ))}
      </Swiper>
    </Fragment>
  );
};

export default TrailersCarousel;
