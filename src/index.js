import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import {history} from './router/AppRouter';
import {startSetExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import './index.css';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import * as serviceWorker from './serviceWorker';


const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
        renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
        
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});



serviceWorker.unregister();
