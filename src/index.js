import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as stores from './store/stores'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

let store = stores.reducers()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
