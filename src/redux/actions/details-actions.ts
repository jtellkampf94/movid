import {
  Details,
  Credits,
  Trailers,
  Reviews
} from "./../reducers/details-reducer";
import { ActionTypes } from "./../action-types/index";

export interface GetDetailsAction {
  type: ActionTypes.GET_DETAILS;
  payload: Details;
}

export interface GetCreditsAction {
  type: ActionTypes.GET_CREDITS;
  payload: Credits;
}

export interface GetTrailersAction {
  type: ActionTypes.GET_TRAILERS;
  payload: Trailers;
}

export interface GetReviewsAction {
  type: ActionTypes.GET_REVIEWS;
  payload: Reviews;
}

export interface ClearDetailsAction {
  type: ActionTypes.CLEAR_DETAILS;
}

export type detailsAction =
  | GetDetailsAction
  | GetCreditsAction
  | GetTrailersAction
  | GetReviewsAction
  | ClearDetailsAction;
