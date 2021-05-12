import {
  MovieSearchResult,
  SearchedPeople
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
  payload: SearchedPeople;
}

export type MoviesAction =
  | GetUpcomingMoviesAction
  | GetPopularMoviesAction
  | GetNowPlayingMoviesAction
  | GetTopRatedMoviesAction
  | GetDiscoverMoviesAction;
