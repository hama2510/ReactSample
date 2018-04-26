import * as actionTypes from 'constants/actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REQUEST_URL } from 'constants/config';

export const getLocations = () => (dispatch, getState) => {
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/locations`, {
      method: 'GET',
      headers: {
        'X-K-APP-TOKEN': getState().storeState.token
      }
    })
      .then(res => {
        dispatch(hideLoading());
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(locations => {
        dispatch({
          type: actionTypes.GET_LOCATIONS,
          locations,
        });
      });
};