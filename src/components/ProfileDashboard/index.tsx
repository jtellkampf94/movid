import React, { useState } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  UserMoviesResults,
  UserTVResults
} from "../../redux/reducers/user-reducer";
import MovieCard from "../MovieCard";
import ProfileLink from "../ProfileLink";

import "./profileDashboard.scss";

interface ProfileDashboardProps {
  handleLogOut: () => void;
}

type itemType =
  | { type: "movie"; results: UserMoviesResults["results"] }
  | { type: "tv"; results: UserTVResults["results"] };

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  handleLogOut
}) => {
  const state = useTypedSelector(state => state);
  const {
    ratedMovies,
    ratedTV,
    favoriteMovies,
    favoriteTV,
    moviesWatchlist,
    TVWatchlist
  } = state.user;
  const { movieGenres, images } = state.config;

  const [items, setItems] = useState<itemType>({
    type: "movie",
    results: ratedMovies.results
  });

  const [title, setTitle] = useState("Rated Movies");

  return (
    <div className="profile-dashboard-container">
      <div className="profile-dashboard-sidebar">
        <ProfileLink
          title="Rated Movies"
          handleClick={() =>
            setItems({ type: "movie", results: ratedMovies.results })
          }
          setTitle={title => setTitle(title)}
        />
        <ProfileLink
          title="Rated TV Shows"
          handleClick={() => setItems({ type: "tv", results: ratedTV.results })}
          setTitle={title => setTitle(title)}
        />
        <ProfileLink
          title="Favorite Movies"
          handleClick={() =>
            setItems({ type: "movie", results: favoriteMovies.results })
          }
          setTitle={title => setTitle(title)}
        />
        <ProfileLink
          title="Favorite TV Shows"
          handleClick={() =>
            setItems({ type: "tv", results: favoriteTV.results })
          }
          setTitle={title => setTitle(title)}
        />
        <ProfileLink
          title="Movies Watchlist"
          handleClick={() =>
            setItems({ type: "movie", results: moviesWatchlist.results })
          }
          setTitle={title => setTitle(title)}
        />
        <ProfileLink
          title="TV Watchlist"
          handleClick={() =>
            setItems({ type: "tv", results: TVWatchlist.results })
          }
          setTitle={title => setTitle(title)}
        />
      </div>

      <div className="profile-dashboard-main">
        <h1 className="profile-dashboard-main-title">Profile</h1>
        <h2 className="profile-dashboard-main-subtitle">{title}</h2>

        {items.results.length > 0 &&
          items.type === "movie" &&
          items.results.map(item => (
            <MovieCard
              key={item.id}
              movie={item}
              isTV={false}
              movieGenres={movieGenres}
              secureBaseUrl={images.images.secure_base_url}
              posterSize={images.images.poster_sizes[2]}
            />
          ))}

        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );
};

export default ProfileDashboard;
