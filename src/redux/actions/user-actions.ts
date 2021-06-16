import {
  UserDetails,
  UserMoviesResults,
  UserTVResults
} from "../reducers/user-reducer";
import { ActionTypes } from "../action-types";

export interface GetUserDetailsAction {
  type: ActionTypes.GET_USER_DETAILS;
  payload: UserDetails;
}

export interface GetRatedMoviesAction {
  type: ActionTypes.GET_RATED_MOVIES;
  payload: UserMoviesResults;
}

export interface GetRatedTVAction {
  type: ActionTypes.GET_RATED_TV;
  payload: UserTVResults;
}

export interface GetFavoriteMoviesAction {
  type: ActionTypes.GET_FAVORITE_MOVIES;
  payload: UserMoviesResults;
}

export interface GetFavoriteTVAction {
  type: ActionTypes.GET_FAVORITE_TV;
  payload: UserTVResults;
}

export interface GetMovieWatchlistAction {
  type: ActionTypes.GET_MOVIE_WATCHLIST;
  payload: UserMoviesResults;
}

export interface GetTVWatchlistAction {
  type: ActionTypes.GET_TV_WATCHLIST;
  payload: UserTVResults;
}

export interface LogOutAction {
  type: ActionTypes.LOG_OUT;
}

export type UserAction =
  | GetUserDetailsAction
  | GetRatedMoviesAction
  | GetRatedTVAction
  | GetFavoriteMoviesAction
  | GetFavoriteTVAction
  | GetMovieWatchlistAction
  | GetTVWatchlistAction
  | LogOutAction;
