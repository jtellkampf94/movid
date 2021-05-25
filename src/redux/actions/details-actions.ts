import { Details } from "./../reducers/details-reducer";
import { ActionTypes } from "./../action-types/index";

export interface GetDetailsAction {
  type: ActionTypes.GET_DETAILS;
  payload: Details;
}

export type detailsAction = GetDetailsAction;
