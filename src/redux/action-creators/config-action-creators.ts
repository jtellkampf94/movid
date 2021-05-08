import axios from "axios";
import { Dispatch } from "redux";
import ActionTypes from "../action-types";
import { GetConfigAction } from "../actions";

const key = "1ded79dbc2a8dfdb74aafb044ce26713";

export const getConfig = () => async (
  dispatch: Dispatch
): Promise<GetConfigAction | void> => {
  try {
    const config = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${key}`
    );
    return dispatch({ type: ActionTypes.GET_CONFIG, payload: config.data });
  } catch (error) {
    console.log(error);
  }
};
