import ActionTypes from "../action-types";

export interface GetConfigAction {
  type: ActionTypes.GET_CONFIG;
  payload: any;
}

export type ConfigActions = GetConfigAction;
