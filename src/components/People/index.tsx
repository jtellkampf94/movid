import { useEffect, Fragment } from "react";
import { Link, RouteComponentProps, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CombinedCredits } from "../../redux/reducers/people-reducer";
import Header from "../Header";
import StarRating from "../StarRating";

import "./people.scss";

interface Params {
  id: string;
}

interface LocationState {
  backdropURL: string;
}

const People: React.FC<RouteComponentProps<Params>> = ({ match, location }) => {
  const {
    getPeopleDetails,
    getPeopleCombinedCredits,
    clearPeople
  } = useActions();

  useEffect(() => {
    const id = match.params.id;
    getPeopleDetails(id);
    getPeopleCombinedCredits(id);

    return () => {
      clearPeople();
      console.log("cleared");
    };
  }, []);

  const removeDuplicates = (creditsArray: CombinedCredits["cast"]) => {
    let uniqueArray: CombinedCredits["cast"] = [];
    creditsArray.forEach(credit => {
      const res = uniqueArray.filter(c => c.id === credit.id);
      if (res.length === 0) {
        uniqueArray.push(credit);
      }
    });

    return uniqueArray;
  };

  const state = useTypedSelector(state => state);
  const { state: locationState } = useLocation<LocationState>();

  const { secure_base_url, poster_sizes } = state.config.images.images;
  const person = state.people.details;
  const combinedCredits = state.people.combinedCredits;

  let backgroundImage;
  if (combinedCredits.cast.length > 0) {
    backgroundImage = combinedCredits.cast[0].backdrop_path
      ? combinedCredits.cast[0].backdrop_path
      : combinedCredits.cast[1].backdrop_path
      ? combinedCredits.cast[1].backdrop_path
      : null;
  }

  const fallbackImage = locationState.backdropURL
    ? locationState.backdropURL
    : "";

  return (
    <div className="people">
      <Header />
      {person.name.length > 0 && combinedCredits.cast.length > 0 ? (
        <Fragment>
          <div
            className="people-poster"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
              url(${secure_base_url}original${
                combinedCredits.cast[0].backdrop_path
                  ? backgroundImage
                  : fallbackImage
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
            <h2 className="people-heading">Biography</h2>
            <p className="people-main-biography">{person.biography}</p>

            <h2 className="people-heading">Credits</h2>

            {combinedCredits.cast.length > 0 ? (
              removeDuplicates(combinedCredits.cast).map((role, index) => (
                <Link
                  key={role.id}
                  to={`/details/${role.media_type}/${role.id}`}
                >
                  <div className="people-main-credit">
                    {role.poster_path ? (
                      <div className="people-main-credit-image-container">
                        <img
                          className="people-main-credit-image"
                          src={
                            secure_base_url + poster_sizes[0] + role.poster_path
                          }
                          alt={role.title}
                        />
                      </div>
                    ) : (
                      <div className="people-main-credit-placeholder">
                        <i className="people-main-credit-placeholder-image far fa-file-image"></i>
                      </div>
                    )}
                    <div className="people-main-credit-details">
                      <h3 className="people-main-credit-title">{role.title}</h3>
                      <p className="people-main-credit-character">
                        {role.character}
                      </p>
                      <p className="people-main-credit-overview">
                        {role.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="people-loader-container header-loader">
                <ScaleLoader loading color="white" />
              </div>
            )}
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
