import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import {
  GetTVAiringTodayAction,
  GetPopularTVAction,
  GetTVOnTheAirAction,
  GetTopRatedTVAction
} from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const getTVAiringToday = () => async (
  dispatch: Dispatch
): Promise<GetTVAiringTodayAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1`
    );
    const action: GetTVAiringTodayAction = {
      type: ActionTypes.GET_TV_AIRING_TODAY,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getPopularTV = () => async (
  dispatch: Dispatch
): Promise<GetPopularTVAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
    );
    const action: GetPopularTVAction = {
      type: ActionTypes.GET_POPULAR_TV,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTVOnTheAir = () => async (
  dispatch: Dispatch
): Promise<GetTVOnTheAirAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`
    );
    const action: GetTVOnTheAirAction = {
      type: ActionTypes.GET_TV_ON_THE_AIR,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedTV = () => async (
  dispatch: Dispatch
): Promise<GetTopRatedTVAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`
    );
    const action: GetTopRatedTVAction = {
      type: ActionTypes.GET_TOP_RATED_TV,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
