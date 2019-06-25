import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../Reducers/Expenses';
import filtersReducer from '../Reducers/Filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
