import * as actionTypes from 'constants/actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REQUEST_URL } from 'constants/config';
import { SUCCESS, ERROR } from 'constants/messageConstant';

export const createCard = (card) => (dispatch, getState) => {
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-K-APP-TOKEN': getState().storeState.token
      },
      body: JSON.stringify(card)
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