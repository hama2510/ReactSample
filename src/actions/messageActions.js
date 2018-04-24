import * as actionTypes from 'constants/actionTypes';

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_MESSAGE
  });
};