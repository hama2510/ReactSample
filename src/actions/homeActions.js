import * as actionTypes from 'constants/actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { REQUEST_URL } from 'constants/config';
import { SUCCESS, ERROR } from 'constants/messageConstant';

export const init = () => (dispatch) => {
    // const token = sessionStorage.getItem('token');
    const token = '12312312312';
    dispatch({
    type: actionTypes.INIT,
    token,
  });
};

export const getCurrentUser = () => (dispatch) => {
  const user = sessionStorage.getItem('user');
  if(user){
    dispatch({
    type: actionTypes.GET_CURRENT_USER,
    user: JSON.parse(user),
    });
  }
};

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

export const login = (username, password) => (dispatch, getState) => {
  dispatch(showLoading());
  const user = {
    username: username,
    password: password
  }
  fetch(`${REQUEST_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-K-APP-TOKEN': getState().storeState.token
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      dispatch(hideLoading());
      if (res.ok) {
        dispatch({
          type: actionTypes.RECEIVE_MESSAGE,
          message: {
            content: 'Đăng nhập thành công',
            type: SUCCESS,
          }
        });
        return res.json();
      }
      dispatch({
        type: actionTypes.RECEIVE_MESSAGE,
        message: {
          content: 'Đăng nhập thất bại',
          type: ERROR,
        }
      });
    })
    .then(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: actionTypes.LOGIN,
        user,
      });
    });
};

export const logout = () => (dispatch) => {
  const user = sessionStorage.removeItem('user');
    dispatch({
    type: actionTypes.LOG_OUT,
    });
};