import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { usePagination } from "../../hooks/usePagination";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  UserMoviesResults,
  UserTVResults,
} from "../../redux/reducers/user-reducer";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import ProfileLink from "../ProfileLink";

import "./profileDashboard.scss";

interface ProfileDashboardProps {
  handleLogOut: () => void;
}

type itemType =
  | { type: "movie"; results: UserMoviesResults; action: any }
  | { type: "tv"; results: UserTVResults; action: any };

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  handleLogOut,
}) => {
  const { nextPage, previousPage, page } = usePagination();
  const state = useTypedSelector((state) => state);
  const {
    getRatedMovies,
    getRatedTV,
    getFavoriteMovies,
    getFavoriteTV,
    getMovieWatchlist,
    getTVWatchlist,
  } = useActions();
  const {
    ratedMovies,
    ratedTV,
    favoriteMovies,
    favoriteTV,
    moviesWatchlist,
    TVWatchlist,
  } = state.user;
  const { movieGenres, images } = state.config;
  const { session_id } = state.auth.session;
  const { id: accountId } = state.user.details;

  const [items, setItems] = useState<itemType>({
    type: "movie",
    results: ratedMovies,
    action: getRatedMovies,
  });

  const [title, setTitle] = useState("");

  useEffect(() => {
    setItems({
      type: "movie",
      results: ratedMovies,
      action: getRatedMovies,
    });

    setTitle("Rated Movies");
  }, [ratedMovies]);

  useEffect(() => {
    if (session_id.length > 0 && accountId !== 0) {
      items.action(session_id, accountId.toString(), page);
    }
  }, [page]);

  return (
    <div className="profile-dashboard-container">
      <div className="profile-dashboard-sidebar">
        <ProfileLink
          title="Rated Movies"
          handleClick={() =>
            setItems({
              type: "movie",
              results: ratedMovies,
              action: getRatedMovies,
            })
          }
          setTitle={(title) => setTitle(title)}
        />
        <ProfileLink
          title="Rated TV Shows"
          handleClick={() =>
            setItems({ type: "tv", results: ratedTV, action: getRatedTV })
          }
          setTitle={(title) => setTitle(title)}
        />
        <ProfileLink
          title="Favorite Movies"
          handleClick={() =>
            setItems({
              type: "movie",
              results: favoriteMovies,
              action: getFavoriteMovies,
            })
          }
          setTitle={(title) => setTitle(title)}
        />
        <ProfileLink
          title="Favorite TV Shows"
          handleClick={() =>
            setItems({ type: "tv", results: favoriteTV, action: getFavoriteTV })
          }
          setTitle={(title) => setTitle(title)}
        />
        <ProfileLink
          title="Movies Watchlist"
          handleClick={() =>
            setItems({
              type: "movie",
              results: moviesWatchlist,
              action: getMovieWatchlist,
            })
          }
          setTitle={(title) => setTitle(title)}
        />
        <ProfileLink
          title="TV Watchlist"
          handleClick={() =>
            setItems({
              type: "tv",
              results: TVWatchlist,
              action: getTVWatchlist,
            })
          }
          setTitle={(title) => setTitle(title)}
        />
      </div>

      <div className="profile-dashboard-main">
        <h1 className="profile-dashboard-main-title">Profile</h1>
        <h2 className="profile-dashboard-main-subtitle">{title}</h2>

        <div className="profile-dashboard-main-results-container">
          {items.results.total_results > 0 &&
            items.type === "movie" &&
            items.results.results.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                isTV={false}
                movieGenres={movieGenres}
                secureBaseUrl={images.images.secure_base_url}
                posterSize={images.images.poster_sizes[2]}
              />
            ))}

          {items.results.total_results > 0 &&
            items.type === "tv" &&
            items.results.results.map((item) => (
              <MovieCard
                key={item.id}
                tv={item}
                isTV={true}
                movieGenres={movieGenres}
                secureBaseUrl={images.images.secure_base_url}
                posterSize={images.images.poster_sizes[2]}
              />
            ))}
        </div>

        {/* <button onClick={handleLogOut}>Log out</button> */}
        {items.results.total_pages > 1 && page !== 0 && (
          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={page}
            totalPages={items.results.total_pages}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
