import ActionTypes from "../action-types";
import { ConfigActions } from "../actions";

interface State {
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

const initialState: State = {
  change_keys: [],
  images: {
    backdrop_sizes: [],
    base_url: "",
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    secure_base_url: "",
    still_sizes: []
  }
};

const configReducer = (state: State = initialState, action: ConfigActions) => {
  switch (action.type) {
    case ActionTypes.GET_CONFIG:
      return { config: action.payload };
    default:
      return state;
  }
};

export default configReducer;
