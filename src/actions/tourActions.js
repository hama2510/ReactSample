import * as actionTypes from 'constants/actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REQUEST_URL } from 'constants/config';

export const getTours = () => (dispatch, getState) => {
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/tours`, {
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
      .then(tours => {
        dispatch({
          type: actionTypes.GET_TOURS,
          tours,
        });
      });
};