import { SearchResultsState } from "../reducers/search-reducer";
import { ActionTypes } from "../action-types";

export interface SearchAction {
  type: ActionTypes.SEARCH;
  payload: SearchResultsState;
}

export type SearchActions = SearchAction;
