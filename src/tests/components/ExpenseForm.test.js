import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render ExpenseForm with defaults', ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with values', ()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error  for invalid submission', ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('Submit', {
        preventDefault: ()=> {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', ()=>{
    const value = 'yolo';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});


test('should set note on textarea input change', ()=>{
    const value = 'yolomofo';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

// test('should set amount when valid value is provided',()=> {
//     const value = 2300;
//     const wrapper = shallow(<ExpenseForm />);
//     wrapper.find('input').at(1).simulate('change',  {
//         target: {value}
//     });
//     expect(wrapper.state('amount')).toBe(value);
// });


test('should set the submit function properly in ExpenseForm', ()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () =>{}
    });
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note

    });});


test('render DatePicker component properly with the props', ()=>{
    const value = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(value);
    expect(wrapper.state('createdAt')).toEqual(value);
});