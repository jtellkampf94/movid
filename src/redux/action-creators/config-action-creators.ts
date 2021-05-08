import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import { GetConfigAction } from "../actions";

const key = "1ded79dbc2a8dfdb74aafb044ce26713";

export const getConfig = () => async (
  dispatch: Dispatch
): Promise<GetConfigAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${key}`
    );
    const action: GetConfigAction = {
      type: ActionTypes.GET_CONFIG,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
