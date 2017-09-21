import { ACTIONS } from 'actions/ola';

export const defaultState = {
};

export default function olaReducer(state = defaultState, action) {
  switch (action.type) {
    // FETCHING ola
    case ACTIONS.FETCH_REQUEST:
      return { ...state, fetchingola: true };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        fetchingola: false,
      };
    case ACTIONS.FETCH_ERROR:
      return { ...state, fetchingola: false, error: action.error };

    default: return state;
  }
}
