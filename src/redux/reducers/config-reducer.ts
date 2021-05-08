import { ActionTypes } from "../action-types";
import { ConfigActions } from "../actions";

export interface ConfigState {
  change_keys: string[];
  images: {
    backdrop_sizes: string[];
    base_url: string;
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    secure_base_url: string;
    still_sizes: string[];
  };
}

const configReducer = (state: ConfigState | {} = {}, action: ConfigActions) => {
  switch (action.type) {
    case ActionTypes.GET_CONFIG:
      return { ...action.payload };
    default:
      return state;
  }
};

export default configReducer;
