import { useEffect, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header";

import "./details.scss";

interface Params {
  type: string;
  id: string;
}

const Details: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getDetails, getCredits, getTrailers, getReviews } = useActions();
  const details = useTypedSelector(state => state.details.details);
  const credits = useTypedSelector(state => state.details.credits);
  const trailers = useTypedSelector(state => state.details.trailers);
  const reviews = useTypedSelector(state => state.details.reviews);
  const images = useTypedSelector(state => state.config.images.images);
  useEffect(() => {
    const type = match.params.type;
    const id = match.params.id;
    getDetails(type, id);
    getCredits(type, id);
    getTrailers(type, id);
    getReviews(type, id);
  }, []);

  //${images.secure_base_url}original${details.backdrop_path}

  return (
    <div className="details">
      <Header />
      {details && (
        <Fragment>
          <div
            className="details-poster"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
              url(${images.secure_base_url}original${details.backdrop_path})
              center top no-repeat`
            }}
          >
            <div className="details-header">
              <img
                src={
                  images.secure_base_url +
                  images.poster_sizes[0] +
                  details.poster_path
                }
                alt=""
                className="details-header-img"
              />
              <h1 className="details-header-title">{details.title}</h1>
            </div>
          </div>
          <div className="details-main">
            <h2 className="details-main-overview">{details.overview}</h2>
          </div>
        </Fragment>
      )}
      <h1>{credits?.cast[0].name}</h1>
      <iframe
        title="1"
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${trailers?.results[0].key}`}
      ></iframe>
      <p>{reviews?.results[0].content}</p>
    </div>
  );
};

export default Details;
