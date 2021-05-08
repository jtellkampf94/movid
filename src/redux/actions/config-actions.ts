import { ConfigState } from "./../reducers/config-reducer";
import { ActionTypes } from "../action-types";

export interface GetConfigAction {
  type: ActionTypes.GET_CONFIG;
  payload: ConfigState;
}

export type ConfigActions = GetConfigAction;
