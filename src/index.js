import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.less'
import App from './App';
import * as stores from './store/stores'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

let store = stores.reducers()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
registerServiceWorker();
