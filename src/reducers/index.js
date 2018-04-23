import * as actionTypes from 'constants/actionTypes';

const initState = {
  token: null,
  user: {
    id: ''
  },
  tours:[]
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.GET_TOURS:
      return {
        ...state,
        tours: action.tours
      };
    default:
      return state;
  }
  
};
