import { MoviesAction } from "./../actions";
import { ActionTypes } from "../action-types/index";

// Interfaces uced to make up movie state
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieSearchResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieDetails[];
  total_pages: number;
  total_results: number;
}

export interface MoviesState {
  nowPlaying: MovieSearchResult;
  upcoming: MovieSearchResult;
  popular: MovieSearchResult;
  topRated: MovieSearchResult;
}

// Derriving initial state for reducer using interfaces above

const initialMovieDetailsState: MovieDetails = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: true,
  vote_average: 0,
  vote_count: 0
};

const initialMovieSearchResult: MovieSearchResult = {
  dates: {
    maximum: "",
    minimum: ""
  },
  page: 0,
  results: [{ ...initialMovieDetailsState }],
  total_pages: 0,
  total_results: 0
};

const initialMoviesState: MoviesState = {
  nowPlaying: { ...initialMovieSearchResult },
  upcoming: { ...initialMovieSearchResult },
  popular: { ...initialMovieSearchResult },
  topRated: { ...initialMovieSearchResult }
};

// reducer

const moviesReducer = (
  state: MoviesState = initialMoviesState,
  action: MoviesAction
): MoviesState => {
  switch (action.type) {
    case ActionTypes.GET_NOW_PLAYING_MOVIES:
      return { ...state, nowPlaying: action.payload };
    case ActionTypes.GET_UPCOMING_MOVIES:
      return { ...state, upcoming: action.payload };
    case ActionTypes.GET_POPULAR_MOVIES:
      return { ...state, popular: action.payload };
    case ActionTypes.GET_TOP_RATED_MOVIES:
      return { ...state, topRated: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
