import { AuthAction } from "./../actions";
import { ActionTypes } from "../action-types";

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface Session {
  success: boolean;
  session_id: string;
}

export interface DeletedSession {
  success: boolean;
}

interface AuthState {
  requestToken: RequestToken;
  session: Session;
  loggedIn: boolean;
}

const initialState: AuthState = {
  requestToken: {
    success: false,
    expires_at: "",
    request_token: ""
  },
  session: {
    success: false,
    session_id: ""
  },
  loggedIn: false
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case ActionTypes.REQUEST_TOKEN:
      return { ...state, requestToken: action.payload };
    case ActionTypes.CREATE_SESSION:
      return { ...state, session: action.payload, loggedIn: true };
    case ActionTypes.DELETE_SESSION:
      return action.payload.success ? initialState : state;
    default:
      return state;
  }
};

export default authReducer;
