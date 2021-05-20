import { url } from "inspector";
import { Link } from "react-router-dom";
import { MovieDetails } from "../../redux/reducers/movies-reducer";
import "./movieCard.scss";

interface MovieCardProps {
  movie: MovieDetails;
  secureBaseUrl: string;
  posterSize: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  secureBaseUrl,
  posterSize
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
        <h2 className="movie-card-title">{movie.title}</h2>
        {/* <div className="movie-card-body">{movie.overview}</div> */}
        <div className="movie-card-rating">{movie.vote_average}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
