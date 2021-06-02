import { useEffect, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header";
import StarRating from "../StarRating";

import "./people.scss";

interface Params {
  id: string;
}

const People: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getPeopleDetails, getPeopleCombinedCredits } = useActions();

  useEffect(() => {
    const id = match.params.id;
    getPeopleDetails(id);
    getPeopleCombinedCredits(id);
  }, []);

  const state = useTypedSelector(state => state);

  const { secure_base_url, poster_sizes } = state.config.images.images;
  const person = state.people.details;
  const combinedCredits = state.people.combinedCredits;

  return (
    <div className="people">
      <Header />
      {person ? (
        <Fragment>
          <div
            className="people-poster"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
              url(${secure_base_url}original${
                combinedCredits.cast.length > 0
                  ? combinedCredits.cast[0].backdrop_path
                  : ""
              })
              center top no-repeat`
            }}
          >
            <div className="people-header">
              <img
                src={secure_base_url + poster_sizes[0] + person.profile_path}
                alt=""
                className="people-header-img"
              />
              <div className="people-header-info">
                <h1 className="people-header-info-title">{person.name}</h1>
                <div className="people-header-info-rating">
                  <span className="people-header-info-rating-number">
                    {Number((person.popularity / 10).toFixed(1))}
                  </span>
                  <StarRating
                    rating={Number((person.popularity / 10).toFixed(1))}
                  />
                </div>
                <p className="people-header-info-status">
                  {person.gender === 1 ? "Female" : "Male"} |{" "}
                  {person.known_for_department}
                </p>
              </div>
            </div>
          </div>
          <div className="people-main">
            <h2 className="people-main-biography">{person.biography}</h2>
          </div>
        </Fragment>
      ) : (
        <div className="people-loader-container header-loader">
          <ScaleLoader loading color="white" />
        </div>
      )}
    </div>
  );
};

export default People;
