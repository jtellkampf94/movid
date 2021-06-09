import axios from "axios";
import { Dispatch } from "redux";

import { ActionTypes } from "../action-types";
import {
  RequestTokenAction,
  CreateSessionAction,
  DeleteSessionAction,
  ClearRequestTokenAction
} from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const requestToken = () => async (
  dispatch: Dispatch
): Promise<RequestTokenAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${key}`
    );
    const action: RequestTokenAction = {
      type: ActionTypes.REQUEST_TOKEN,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createSession = (token: string) => async (
  dispatch: Dispatch
): Promise<CreateSessionAction | void> => {
  try {
    const {
      data
    } = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${key}`,
      { request_token: token }
    );
    const action: CreateSessionAction = {
      type: ActionTypes.CREATE_SESSION,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSession = (sessionId: string) => async (
  dispatch: Dispatch
): Promise<DeleteSessionAction | void> => {
  try {
    const {
      data
    } = await axios.delete(
      `https://api.themoviedb.org/3/authentication/session?api_key=${key}`,
      { data: { session_id: sessionId } }
    );
    const action: DeleteSessionAction = {
      type: ActionTypes.DELETE_SESSION,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const clearRequestToken = () => (
  dispatch: Dispatch
): ClearRequestTokenAction => {
  const action: ClearRequestTokenAction = {
    type: ActionTypes.CLEAR_REQUEST_TOKEN
  };
  return dispatch(action);
};
