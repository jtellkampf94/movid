import { UserAction } from "../actions";
import { ActionTypes } from "../action-types";

export interface UserDetails {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface UserMoviesResults {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number;
  }[];
  total_pages: number;
  total_results: number;
}

export interface UserTVResults {
  page: number;
  results: {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: string | null;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
    rating: number;
  }[];
  total_pages: number;
  total_results: number;
}

interface UserState {
  details: UserDetails;
  ratedMovies: UserMoviesResults;
  ratedTV: UserTVResults;
  favoriteMovies: UserMoviesResults;
  favoriteTV: UserTVResults;
  moviesWatchlist: UserMoviesResults;
  TVWatchlist: UserTVResults;
}

const userDetails: UserDetails = {
  avatar: {
    gravatar: {
      hash: ""
    }
  },
  id: 0,
  iso_639_1: "",
  iso_3166_1: "",
  name: "",
  include_adult: false,
  username: ""
};

const userMoviesResults: UserMoviesResults = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0
};

const userTVResults: UserTVResults = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0
};

const initialState: UserState = {
  details: { ...userDetails },
  ratedMovies: { ...userMoviesResults },
  ratedTV: { ...userTVResults },
  favoriteMovies: { ...userMoviesResults },
  favoriteTV: { ...userTVResults },
  moviesWatchlist: { ...userMoviesResults },
  TVWatchlist: { ...userTVResults }
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.GET_USER_DETAILS:
      return { ...state, details: action.payload };
    case ActionTypes.GET_RATED_MOVIES:
      return { ...state, ratedMovies: action.payload };
    case ActionTypes.GET_RATED_TV:
      return { ...state, ratedTV: action.payload };
    case ActionTypes.GET_FAVORITE_MOVIES:
      return { ...state, favoriteMovies: action.payload };
    case ActionTypes.GET_FAVORITE_TV:
      return { ...state, favoriteTV: action.payload };
    case ActionTypes.GET_MOVIE_WATCHLIST:
      return { ...state, moviesWatchlist: action.payload };
    case ActionTypes.GET_TV_WATCHLIST:
      return { ...state, TVWatchlist: action.payload };
    default:
      return state;
  }
};

export default userReducer;
