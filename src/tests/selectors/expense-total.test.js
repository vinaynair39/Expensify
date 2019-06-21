import {shallow} from 'enzyme';
import getTotalAmount from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Total amount selector with expenses', () => {
    const result = getTotalAmount(expenses);
    expect(result).toEqual(114195)
})

test('Total amount selector without expenses', () => {
    const result = getTotalAmount([]);
    expect(result).toEqual(0)
})

test('Total amount selector with one expense', () => {
    const result = getTotalAmount([expenses[0]]);
    expect(result).toEqual(195)
})