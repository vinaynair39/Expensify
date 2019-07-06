import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';
import {NavLink} from 'react-router-dom';

const ExpenseDashboardPage = () => (
  <div>
    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <ExpenseListFilters />
    <ExpensesSummary/>
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
