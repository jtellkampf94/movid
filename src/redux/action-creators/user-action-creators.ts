import axios from "axios";
import { Dispatch } from "redux";

import {
  GetUserDetailsAction,
  GetRatedMoviesAction,
  GetRatedTVAction,
  GetFavoriteMoviesAction,
  GetFavoriteTVAction,
  GetMovieWatchlistAction,
  GetTVWatchlistAction,
  AddToWatchlistAction,
  MarkAsFavoriteAction
} from "../actions";
import { ActionTypes } from "./../action-types/index";

const key = process.env.REACT_APP_API_KEY;

export const getUserDetails = (sessionId: string) => async (
  dispatch: Dispatch
): Promise<GetUserDetailsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${key}&session_id=${sessionId}`
    );
    const action: GetUserDetailsAction = {
      type: ActionTypes.GET_USER_DETAILS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getRatedMovies = (sessionId: string, accountId: string) => async (
  dispatch: Dispatch
): Promise<GetRatedMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetRatedMoviesAction = {
      type: ActionTypes.GET_RATED_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getRatedTV = (sessionId: string, accountId: string) => async (
  dispatch: Dispatch
): Promise<GetRatedTVAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/rated/tv?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetRatedTVAction = {
      type: ActionTypes.GET_RATED_TV,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteMovies = (
  sessionId: string,
  accountId: string
) => async (dispatch: Dispatch): Promise<GetFavoriteMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetFavoriteMoviesAction = {
      type: ActionTypes.GET_FAVORITE_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteTV = (sessionId: string, accountId: string) => async (
  dispatch: Dispatch
): Promise<GetFavoriteTVAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetFavoriteTVAction = {
      type: ActionTypes.GET_FAVORITE_TV,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieWatchlist = (
  sessionId: string,
  accountId: string
) => async (dispatch: Dispatch): Promise<GetMovieWatchlistAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetMovieWatchlistAction = {
      type: ActionTypes.GET_MOVIE_WATCHLIST,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTVWatchlist = (sessionId: string, accountId: string) => async (
  dispatch: Dispatch
): Promise<GetTVWatchlistAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=${key}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    const action: GetTVWatchlistAction = {
      type: ActionTypes.GET_TV_WATCHLIST,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

interface WatchlistParams {
  sessionId: string;
  accountId: string;
  mediaId: number;
  watchlist: boolean;
  mediaType: string;
}

export const addToWatchlist = ({
  sessionId,
  accountId,
  mediaId,
  watchlist,
  mediaType
}: WatchlistParams) => async (
  dispatch: Dispatch
): Promise<AddToWatchlistAction | void> => {
  try {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/?api_key=${key}&session_id=${sessionId}`,
      { media_type: mediaType, media_id: mediaId, watchlist },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    const action: AddToWatchlistAction = {
      type: ActionTypes.ADD_TO_WATCHLIST,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

interface FavoriteParams {
  sessionId: string;
  accountId: string;
  mediaId: number;
  favorite: boolean;
  mediaType: string;
}

export const markAsFavorite = ({
  sessionId,
  accountId,
  mediaId,
  favorite,
  mediaType
}: FavoriteParams) => async (
  dispatch: Dispatch
): Promise<MarkAsFavoriteAction | void> => {
  try {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/?api_key=${key}&session_id=${sessionId}`,
      { media_type: mediaType, media_id: mediaId, favorite },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    const action: MarkAsFavoriteAction = {
      type: ActionTypes.MARK_AS_FAVORITE,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};