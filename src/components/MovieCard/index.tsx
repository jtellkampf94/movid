import { url } from "inspector";
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
  return (
    <Link
      className="movie-card"
      to={`/details/${movie.name ? "tv" : "movie"}/${movie.id}`}
    >
      <div
        className="movie-card-background"
        style={{
          background: `url(${secureBaseUrl}${posterSize}${movie.poster_path})  no-repeat`
        }}
      >
        <div className="movie-card-body">
          {/* <h2 className="movie-card-title">{movie.title}</h2> */}
          <div className="movie-card-rating">
            <i className="fas fa-star movie-card-rating-icon"></i>
            <div className="movie-card-rating-count">
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-card-details">
        {movie.genre_ids.map(genreId => {
          const genre = movieGenres.genres.find(genre => genre.id === genreId);
          return <span key={genreId}>{genre?.name} </span>;
        })}
      </div>
    </Link>
  );
};

export default MovieCard;
