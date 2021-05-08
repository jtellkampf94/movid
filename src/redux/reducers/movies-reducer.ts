import { MoviesAction } from "./../actions";
import { ActionTypes } from "../action-types/index";

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieSearchResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieDetails[];
  total_pages: number;
  total_results: number;
}

export interface MovieState {
  nowPlaying: MovieSearchResult;
  upcoming: MovieSearchResult;
}

const moviesReducer = (state = {}, action: MoviesAction) => {
  switch (action.type) {
    case ActionTypes.GET_NOW_PLAYING_MOVIES:
      return { ...state, nowPlaying: action.payload };
    case ActionTypes.GET_UPCOMING_MOVIES:
      return { ...state, upcoming: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
