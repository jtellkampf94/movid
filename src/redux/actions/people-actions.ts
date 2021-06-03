import { ActionTypes } from "../action-types";

export interface GetPeopleDetailsAction {
  type: ActionTypes.GET_PEOPLE_DETAILS;
  payload: any;
}

export interface GetPeopleCombinedCreditsAction {
  type: ActionTypes.GET_PEOPLE_COMBINDED_CREDITS;
  payload: any;
}

export interface ClearPeopleAction {
  type: ActionTypes.CLEAR_PEOPLE;
}

export type PeopleAction =
  | GetPeopleDetailsAction
  | GetPeopleCombinedCreditsAction
  | ClearPeopleAction;
