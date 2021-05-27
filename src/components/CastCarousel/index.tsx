import React, { useRef, useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const [isActive, setIsActive] = useState(false);
  return (
    <Fragment>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        slidesPerGroup={3}
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
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
              />
            ) : (
              <div
                className="swiper-slide-placeholder"
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
              >
                <i className="far fa-user swiper-slide-placeholder-image"></i>
              </div>
            )}
            <div className={`swiper-slide-details ${isActive ? "active" : ""}`}>
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
