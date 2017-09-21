import { post } from 'actions/fetch.js';

export const ACTIONS = {
  FETCH_REQUEST: 'FETCH__REQUEST',
  FETCH_SUCCESS: 'FETCH__SUCCESS',
  FETCH_ERROR: 'FETCH__ERROR',

  CREATE_REQUEST: 'CREATE__REQUEST',
  CREATE_SUCCESS: 'CREATE__SUCCESS',
  CREATE_ERROR: 'CREATE__ERROR',
};

export function fetchola(url) {
  return function thunkWrapper(dispatch) {
    dispatch({ type: ACTIONS.FETCH_REQUEST });
    return new Promise((resolve, reject) => {
      fetch(user.calculate_cashout_available).then((data) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, data });
        resolve(data);
      }, (error) => {
        dispatch({ type: ACTIONS.FETCH_ERROR, error});
        reject(error);
      });
    });
  };
}

export function addola(url, data) {
  return function thunkWrapper(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ type: ACTIONS.CREATE_REQUEST });
      post(url, { data }).then((created) => {
        dispatch({
          type: ACTIONS.CREATE_SUCCESS,
          created,
        });
        return resolve(data);
      }).catch((errors) => {
        dispatch({ type: ACTIONS.CREATE_ERROR, errors });
        return reject(errors);
      });
    });
  };
}
