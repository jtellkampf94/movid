import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import {
  GetNowPlayingMoviesAction,
  GetPopularMoviesAction,
  GetTopRatedMoviesAction,
  GetUpcomingMoviesAction
} from "../actions";

const key = "1ded79dbc2a8dfdb74aafb044ce26713";

export const getNowPlayingMovies = () => async (
  dispatch: Dispatch
): Promise<GetNowPlayingMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
    );
    const action: GetNowPlayingMoviesAction = {
      type: ActionTypes.GET_NOW_PLAYING_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = () => async (
  dispatch: Dispatch
): Promise<GetUpcomingMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
    );
    const action: GetUpcomingMoviesAction = {
      type: ActionTypes.GET_UPCOMING_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = () => async (
  dispatch: Dispatch
): Promise<GetTopRatedMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
    );
    const action: GetTopRatedMoviesAction = {
      type: ActionTypes.GET_TOP_RATED_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = () => async (
  dispatch: Dispatch
): Promise<GetPopularMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    );
    const action: GetPopularMoviesAction = {
      type: ActionTypes.GET_POPULAR_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
