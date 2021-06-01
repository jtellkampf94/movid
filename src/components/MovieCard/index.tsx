import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieGenreConfig } from "../../redux/reducers/config-reducer";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import { TVDetails } from "../../redux/reducers/tv-reducer";
import "./movieCard.scss";

type MovieCardProps =
  | {
      movieGenres: MovieGenreConfig;
      isTV: true;
      tv: TVDetails;
      secureBaseUrl: string;
      posterSize: string;
    }
  | {
      movieGenres: MovieGenreConfig;
      isTV: false;
      movie: MovieDetails;
      secureBaseUrl: string;
      posterSize: string;
    };

const MovieCard: React.FC<MovieCardProps> = props => {
  const [showDetails, setShowDetails] = useState(false);

  let item = props.isTV ? props.tv : props.movie;

  return (
    <Link
      className=""
      to={`/details/${props.isTV ? "tv" : "movie"}/${
        props.isTV ? props.tv.id : props.movie.id
      }`}
    >
      <div
        className="movie-card"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div
          className="movie-card-background"
          style={{
            background: `url(${props.secureBaseUrl}${props.posterSize}${item.poster_path})  no-repeat`
          }}
        >
          <div className="movie-card-body">
            <div className="movie-card-rating">
              <i className="fas fa-star movie-card-rating-icon"></i>
              <div className="movie-card-rating-count">
                {props.isTV
                  ? props.tv.vote_average.toFixed(1)
                  : props.movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
        {showDetails && (
          <div className="movie-card-details">
            <h2 className="movie-card-details-title">
              {props.isTV ? props.tv.name : props.movie.title} &#40;
              {new Date(
                props.isTV ? props.tv.first_air_date : props.movie.release_date
              ).getFullYear()}
              &#41;
            </h2>
            {item.genre_ids.map((genreId: number) => {
              const genre = props.movieGenres.genres.find(
                genre => genre.id === genreId
              );
              if (genre) {
                return (
                  <span className="movie-card-details-genres" key={genreId}>
                    {genre.name} &#183;{" "}
                  </span>
                );
              } else {
                return "";
              }
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
