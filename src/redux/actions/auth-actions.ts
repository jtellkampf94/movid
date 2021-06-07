import { ActionTypes } from "../action-types";
import {
  RequestToken,
  Session,
  DeletedSession
} from "../reducers/auth-reducer";

export interface RequestTokenAction {
  type: ActionTypes.REQUEST_TOKEN;
  payload: RequestToken;
}

export interface CreateSessionAction {
  type: ActionTypes.CREATE_SESSION;
  payload: Session;
}

export interface DeleteSessionAction {
  type: ActionTypes.DELETE_SESSION;
  payload: DeletedSession;
}

export type AuthAction =
  | RequestTokenAction
  | CreateSessionAction
  | DeleteSessionAction;
