import { ActionTypes } from "../action-types";

export interface GetTVAiringTodayAction {
  type: ActionTypes.GET_TV_AIRING_TODAY;
  payload: any;
}

export interface GetPopularTVAction {
  type: ActionTypes.GET_POPULAR_TV;
  payload: any;
}

export interface GetTVOnTheAirAction {
  type: ActionTypes.GET_TV_ON_THE_AIR;
  payload: any;
}

export interface GetTopRatedTVAction {
  type: ActionTypes.GET_TOP_RATED_TV;
  payload: any;
}

export type TVAction =
  | GetTVAiringTodayAction
  | GetPopularTVAction
  | GetTVOnTheAirAction
  | GetTopRatedTVAction;
