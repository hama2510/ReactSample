/*global document*/
import Modal from 'react-modal';
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';
import Message from './components/message';
import Home from './components/home';

import configureStore from './store/configureStore';
import '../styles/main.scss';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <div>
      <LoadingBar className="loading-bar" />
      <Message />
      <Home />
    </div>
  </Provider>
);
Modal.setAppElement(document.getElementById('app'))
ReactDOM.render(<Root />, document.getElementById('app'));
if (module.hot) {
  module.hot.accept();
}