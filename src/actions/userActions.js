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

export const getCurrentUser = () => (dispatch, getState) => {
  const user = sessionStorage.getItem('user');
  if(user){
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/users/${user}`, {
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
      .then(user => {
        dispatch({
          type: actionTypes.GET_CURRENT_USER,
          user,
        });
      });
  }
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
      sessionStorage.setItem('user', user.id);
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

export const bookTour = (tour) => (dispatch, getState) => {
  const user = sessionStorage.getItem('user');
  if(user){
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/users/${user}/book/${tour}`, {
      method: 'POST',
      headers: {
        'X-K-APP-TOKEN': getState().storeState.token
      }
    })
      .then(res => {
        dispatch(hideLoading());
        if (res.ok) {
          dispatch({
            type: actionTypes.RECEIVE_MESSAGE,
            message: {
              content: 'Đăng ký tour thành công',
              type: SUCCESS,
            }
          });
        }else{
          dispatch({
            type: actionTypes.RECEIVE_MESSAGE,
            message: {
              content: 'Đăng ký tour thất bại',
              type: ERROR,
            }
          });
        }
      })
  }
};

export const deposit = (card) => (dispatch, getState) => {
  const user = sessionStorage.getItem('user');
  const serial = {
    serial: card
  };
  if(user){
    dispatch(showLoading());
    fetch(`${REQUEST_URL}/users/${user}/deposit`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-K-APP-TOKEN': getState().storeState.token
      },
      body: JSON.stringify(serial)
    })
      .then(res => {
        dispatch(hideLoading());
        if (res.ok) {
          dispatch({
            type: actionTypes.RECEIVE_MESSAGE,
            message: {
              content: 'Nạp thẻ thành công, vui lòng kiểm tra thông tin cá nhân mục số dư tài khoản',
              type: SUCCESS,
            }
          });
        }else{
          dispatch({
            type: actionTypes.RECEIVE_MESSAGE,
            message: {
              content: 'Nạp thẻ tour thất bại',
              type: ERROR,
            }
          });
        }
      })
  }else{
    dispatch({
      type: actionTypes.RECEIVE_MESSAGE,
      message: {
        content: 'Phải đăng nhập để thực hiện chức năng này',
        type: ERROR,
      }
    });
  }
};

export const register = (regUser) => (dispatch, getState) => {
  dispatch(showLoading());
  fetch(`${REQUEST_URL}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-K-APP-TOKEN': getState().storeState.token
    },
    body: JSON.stringify(regUser)
  })
    .then(res => {
      dispatch(hideLoading());
      if (res.ok) {
        dispatch({
          type: actionTypes.RECEIVE_MESSAGE,
          message: {
            content: 'Đăng ký thành công, vui lòng đăng nhập',
            type: SUCCESS,
          }
        });
      }else{
        dispatch({
          type: actionTypes.RECEIVE_MESSAGE,
          message: {
            content: 'Đăng ký thất bại',
            type: ERROR,
          }
        });
      }
    })
};