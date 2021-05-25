import { Dispatch } from "redux";
import axios from "axios";
import { GetDetailsAction } from "../actions";
import { ActionTypes } from "../action-types";

const key = process.env.REACT_APP_API_KEY;

export const getDetails = (type: string, id: string) => async (
  dispatch: Dispatch
): Promise<GetDetailsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`
    );
    const action: GetDetailsAction = {
      type: ActionTypes.GET_DETAILS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
