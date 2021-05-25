import { ActionTypes } from "../action-types";
import { TVResults } from "../reducers/tv-reducer";

export interface GetTVAiringTodayAction {
  type: ActionTypes.GET_TV_AIRING_TODAY;
  payload: TVResults;
}

export interface GetPopularTVAction {
  type: ActionTypes.GET_POPULAR_TV;
  payload: TVResults;
}

export interface GetTVOnTheAirAction {
  type: ActionTypes.GET_TV_ON_THE_AIR;
  payload: TVResults;
}

export interface GetTopRatedTVAction {
  type: ActionTypes.GET_TOP_RATED_TV;
  payload: TVResults;
}

export type TVAction =
  | GetTVAiringTodayAction
  | GetPopularTVAction
  | GetTVOnTheAirAction
  | GetTopRatedTVAction;
