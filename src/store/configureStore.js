import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { loadingBarReducer } from 'react-redux-loading-bar';

import storeReducer from 'reducers';
import { reducer as toastr } from 'react-redux-toastr';

const reducers = {
  storeState: storeReducer,
  toastr,
  loadingBar: loadingBarReducer,
};

const middleWare = applyMiddleware(thunk, createLogger());
const reducer = combineReducers(reducers);

export default (initState) => {
  const store = createStore(reducer, initState, middleWare);
  return store;
};