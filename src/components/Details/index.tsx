import { useEffect, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CastCarousel from "../CastCarousel";
import FavoritesButton from "../FavoritesButton";
import Header from "../Header";
import Review from "../Review";
import StarRating from "../StarRating";
import TrailersCarousel from "../TrailersCarousel";
import WatchlistButton from "../WatchlistButton";

import "./details.scss";

interface Params {
  type: "movie" | "tv";
  id: string;
}

const Details: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getDetails, getCredits, getTrailers, getReviews, clearDetails } =
    useActions();
  const state = useTypedSelector((state) => state);
  const images = state.config.images.images;
  const { details, reviews, trailers, credits } = state.details;
  const { session } = state.auth;
  const { moviesWatchlist, TVWatchlist, favoriteMovies, favoriteTV } =
    state.user;

  useEffect(() => {
    const type = match.params.type;
    const id = match.params.id;
    getDetails(type, id);
    getCredits(type, id);
    getTrailers(type, id);
    getReviews(type, id);

    return () => {
      clearDetails();
    };
  }, [
    match.params.type,
    match.params.id,
  ]);

  return (
    <div className="details">
      <Header />
      {details ? (
        <Fragment>
          <div
            className="details-poster"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
              url(${images.secure_base_url}original${details.backdrop_path})
              center top no-repeat`,
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
              <div className="details-header-info">
                <h1 className="details-header-info-title">{details.title}</h1>
                <div className="details-header-info-rating">
                  <span className="details-header-info-rating-number">
                    {details.vote_average}
                  </span>
                  <StarRating
                    id={details.id}
                    itemType={match.params.type}
                    active={true}
                    rating={details.vote_average}
                  />
                </div>
                <p className="details-header-info-status">
                  {details.status} | {details.original_language.toUpperCase()}
                </p>
                {match.params.type === "movie" && (
                  <div className="details-buttons-container">
                    <FavoritesButton
                      favorite={Boolean(
                        favoriteMovies.results.find(
                          (movie) => movie.id === details.id
                        )
                      )}
                      mediaId={details.id}
                      mediaType={match.params.type}
                      sessionId={session.session_id}
                    />
                    <WatchlistButton
                      inWatchlist={Boolean(
                        moviesWatchlist.results.find(
                          (movie) => movie.id === details.id
                        )
                      )}
                      mediaId={details.id}
                      mediaType={match.params.type}
                      sessionId={session.session_id}
                    />
                  </div>
                )}
                {match.params.type === "tv" && (
                  <div className="details-buttons-container">
                    <FavoritesButton
                      favorite={Boolean(
                        favoriteTV.results.find((tv) => tv.id === details.id)
                      )}
                      mediaId={details.id}
                      mediaType={match.params.type}
                      sessionId={session.session_id}
                    />
                    <WatchlistButton
                      inWatchlist={Boolean(
                        TVWatchlist.results.find((tv) => tv.id === details.id)
                      )}
                      mediaId={details.id}
                      mediaType={match.params.type}
                      sessionId={session.session_id}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="details-main">
            <h2 className="details-main-overview">{details.overview}</h2>
          </div>
        </Fragment>
      ) : (
        <div className="details-loader-container header-loader">
          <ScaleLoader loading color="white" />
        </div>
      )}
      <div className="details-cast">
        <h2 className="details-heading">Cast</h2>
        {credits && details && (
          <CastCarousel
            secureBaseURL={images.secure_base_url}
            profileSize={images.profile_sizes[1]}
            cast={credits.cast}
            backdropURL={details.backdrop_path ? details.backdrop_path : ""}
          />
        )}
      </div>

      <div className="details-trailers">
        <h2 className="details-heading">Trailers</h2>
        {trailers ? (
          <TrailersCarousel trailers={trailers.results} />
        ) : (
          <div className="details-loader-container">
            <ScaleLoader loading color="white" />
          </div>
        )}
      </div>

      <div className="details-reviews">
        <h2 className="details-heading">Reviews</h2>
        {reviews ? (
          <Review reviews={reviews.results} />
        ) : (
          <div className="details-loader-container">
            <ScaleLoader loading color="white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
