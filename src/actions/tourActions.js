import * as actionTypes from 'constants/actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REQUEST_URL } from 'constants/config';
import { SUCCESS, ERROR } from 'constants/messageConstant';

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

export const createTour = (tour) => (dispatch, getState) => {
  dispatch(showLoading());
  fetch(`${REQUEST_URL}/tours`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-K-APP-TOKEN': getState().storeState.token
    },
    body: JSON.stringify(tour)
  })
    .then(res => {
      dispatch(hideLoading());
      if (res.ok) {
        dispatch({
          type: actionTypes.RECEIVE_MESSAGE,
          message: {
            content: 'Tạo mới thành công',
            type: SUCCESS,
          }
        });
      }else{
        dispatch({
          type: actionTypes.RECEIVE_MESSAGE,
          message: {
            content: 'Tạo mới thất bại',
            type: ERROR,
          }
        });
      }
    })
};