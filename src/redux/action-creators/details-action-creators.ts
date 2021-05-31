import { Dispatch } from "redux";
import axios from "axios";
import {
  GetDetailsAction,
  GetCreditsAction,
  GetReviewsAction,
  GetTrailersAction,
  ClearDetailsAction
} from "../actions";
import { ActionTypes } from "../action-types";

const key = process.env.REACT_APP_API_KEY;

export const getDetails = (type: string, id: string) => async (
  dispatch: Dispatch
): Promise<GetDetailsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`
    );
    const action: GetDetailsAction = {
      type: ActionTypes.GET_DETAILS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getCredits = (type: string, id: string) => async (
  dispatch: Dispatch
): Promise<GetCreditsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${key}&language=en-US`
    );
    const action: GetCreditsAction = {
      type: ActionTypes.GET_CREDITS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTrailers = (type: string, id: string) => async (
  dispatch: Dispatch
): Promise<GetTrailersAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`
    );
    const action: GetTrailersAction = {
      type: ActionTypes.GET_TRAILERS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = (type: string, id: string) => async (
  dispatch: Dispatch
): Promise<GetReviewsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${key}&language=en-US`
    );
    const action: GetReviewsAction = {
      type: ActionTypes.GET_REVIEWS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const clearDetails = () => (dispatch: Dispatch): ClearDetailsAction => {
  const action: ClearDetailsAction = { type: ActionTypes.CLEAR_DETAILS };
  return dispatch(action);
};
