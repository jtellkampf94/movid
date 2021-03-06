import {
  DiscoverSearchResult,
  MovieSearchResult
} from "./../reducers/movies-reducer";
import { ActionTypes } from "../action-types";

export interface GetUpcomingMoviesAction {
  type: ActionTypes.GET_UPCOMING_MOVIES;
  payload: MovieSearchResult;
}

export interface GetPopularMoviesAction {
  type: ActionTypes.GET_POPULAR_MOVIES;
  payload: MovieSearchResult;
}

export interface GetNowPlayingMoviesAction {
  type: ActionTypes.GET_NOW_PLAYING_MOVIES;
  payload: MovieSearchResult;
}

export interface GetTopRatedMoviesAction {
  type: ActionTypes.GET_TOP_RATED_MOVIES;
  payload: MovieSearchResult;
}

export interface GetDiscoverMoviesAction {
  type: ActionTypes.GET_DISCOVER_MOVIES;
  payload: DiscoverSearchResult;
}

export interface ClearDiscoverMoviesAction {
  type: ActionTypes.CLEAR_DISCOVER_MOVIES;
}

export type MoviesAction =
  | GetUpcomingMoviesAction
  | GetPopularMoviesAction
  | GetNowPlayingMoviesAction
  | GetTopRatedMoviesAction
  | GetDiscoverMoviesAction
  | ClearDiscoverMoviesAction;
