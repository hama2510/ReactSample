/*global document*/

import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';

import Home from './components/home';

import configureStore from './store/configureStore';
import '../styles/main.scss';

const store = configureStore();

const Root = () => (

  <Provider store={store}>
    <div>
      <LoadingBar className="loading-bar" />
      <Home />
    </div>
  </Provider>
);
ReactDOM.render(<Root />, document.getElementById('app'));
if (module.hot) {
  module.hot.accept();
}