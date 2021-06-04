import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import { SearchAction } from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const search = (id: string, page: number) => async (
  dispatch: Dispatch
): Promise<SearchAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${id}&page=${page.toString()}&include_adult=false`
    );
    const action: SearchAction = {
      type: ActionTypes.SEARCH,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
