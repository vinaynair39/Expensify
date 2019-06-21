import React from 'react';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';


test('Should render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[2]]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with multiple expense', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});