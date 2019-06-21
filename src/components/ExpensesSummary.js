import React from 'react';
import getVisibleExpenses from '../selectors/expenses';
import getTotalAmount from '../selectors/expenses-total';
import {connect} from 'react-redux';
import numeral from 'numeral';


export const ExpensesSummary = (props) => {
    const word = props.expenses.length <= 1 ?  'expense' : 'expenses';
    return(
        <h3>Viewing {props.expenses.length} {word} totaling: {numeral(getTotalAmount(props.expenses)).format('0,0')}</h3>
    );
}

const mapStateToProps = (state) => {
    return{
        expenses: getVisibleExpenses(state.expenses, state.filters),
    }
}

export default connect(mapStateToProps)(ExpensesSummary);