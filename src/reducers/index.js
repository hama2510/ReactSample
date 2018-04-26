import * as actionTypes from 'constants/actionTypes';

const initState = {
  token: null,
  user: null,
  tours:[],
  locations: [],
  message: {
    title: '',
    content: '',
    type: null,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.GET_TOURS:
      return {
        ...state,
        tours: action.tours
      };
    case actionTypes.GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.user
      };
      case actionTypes.LOG_OUT:
      return {
        ...state,
        user: null
      };
    case actionTypes.RECEIVE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case actionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          content: null
        }
      };
    default:
      return state;
  }
  
};
