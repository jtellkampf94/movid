import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import {
  GetPeopleDetailsAction,
  GetPeopleCombinedCreditsAction,
  ClearPeopleAction
} from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const getPeopleDetails = (id: string) => async (
  dispatch: Dispatch
): Promise<GetPeopleDetailsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=en-US`
    );
    const action: GetPeopleDetailsAction = {
      type: ActionTypes.GET_PEOPLE_DETAILS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getPeopleCombinedCredits = (id: string) => async (
  dispatch: Dispatch
): Promise<GetPeopleCombinedCreditsAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${key}&language=en-US`
    );
    const action: GetPeopleCombinedCreditsAction = {
      type: ActionTypes.GET_PEOPLE_COMBINDED_CREDITS,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const clearPeople = () => (dispatch: Dispatch): ClearPeopleAction => {
  const action: ClearPeopleAction = {
    type: ActionTypes.CLEAR_PEOPLE
  };
  return dispatch(action);
};
