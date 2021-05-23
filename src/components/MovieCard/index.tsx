import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieGenreConfig } from "../../redux/reducers/config-reducer";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import "./movieCard.scss";

interface MovieCardProps {
  movieGenres: MovieGenreConfig;
  movie: MovieDetails;
  secureBaseUrl: string;
  posterSize: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  secureBaseUrl,
  posterSize,
  movieGenres
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Link
      className=""
      to={`/details/${movie.name ? "tv" : "movie"}/${movie.id}`}
    >
      <div
        className="movie-card"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div
          className="movie-card-background"
          style={{
            background: `url(${secureBaseUrl}${posterSize}${movie.poster_path})  no-repeat`
          }}
        >
          <div className="movie-card-body">
            <div className="movie-card-rating">
              <i className="fas fa-star movie-card-rating-icon"></i>
              <div className="movie-card-rating-count">
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
        {showDetails && (
          <div className="movie-card-details">
            <h2 className="movie-card-details-title">
              {movie.title} &#40;{new Date(movie.release_date).getFullYear()}
              &#41;
            </h2>
            {movie.genre_ids.map(genreId => {
              const genre = movieGenres.genres.find(
                genre => genre.id === genreId
              );
              return (
                <span className="movie-card-details-genres" key={genreId}>
                  {genre?.name} &#183;{" "}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
