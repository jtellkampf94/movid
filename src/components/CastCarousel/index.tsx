import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./castCarousel.scss";

import SwiperCore, { Navigation } from "swiper/core";
import { Credits } from "../../redux/reducers/details-reducer";

SwiperCore.use([Navigation]);

interface CastCarouselProps {
  cast: Credits["cast"];
  secureBaseURL: string;
  profileSize: string;
}

const CastCarousel: React.FC<CastCarouselProps> = ({
  cast,
  secureBaseURL,
  profileSize
}) => {
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1000px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const isExtraSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isExtraExtraSmallScreen = useMediaQuery({
    query: "(max-width: 400px)"
  });

  let slidesPerView = 6;
  let spaceBetween = 20;
  if (isMediumScreen) {
    slidesPerView = 5;
  }
  if (isMediumScreen && isSmallScreen) {
    slidesPerView = 4;
    spaceBetween = 10;
  }
  if (isMediumScreen && isSmallScreen && isExtraSmallScreen) {
    slidesPerView = 3;
    spaceBetween = 10;
  }
  if (
    isMediumScreen &&
    isSmallScreen &&
    isExtraSmallScreen &&
    isExtraExtraSmallScreen
  ) {
    slidesPerView = 2;
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
        {cast.map(person => (
          <SwiperSlide key={person.id}>
            {person.profile_path ? (
              <img
                src={secureBaseURL + profileSize + person.profile_path}
                alt=""
                className="swiper-slide-img"
              />
            ) : (
              <div className="swiper-slide-placeholder">
                <i className="far fa-user swiper-slide-placeholder-image"></i>
              </div>
            )}
            <div className="swiper-slide-details">
              <h2 className="swiper-slide-details-name">{person.name}</h2>
              <p className="swiper-slide-details-character">
                {person.character}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default CastCarousel;
