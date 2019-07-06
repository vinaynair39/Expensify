import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import  database  from '../../firebase/firebase';
import expenses from '../fixtures/expenses';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData ={};
  expenses.forEach(({id,description, amount, note, createdAt}) => {
    expenseData[id] = {description, amount, note, createdAt};
  });
  database.ref('expenses').set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });

});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
    },
  });
});


test('should add expense to database and store', (done) => {
  const store = createMockStore();
  const data = {
    description: "mouse",
    amount: 300,
    note: "hp mouse for laptop",
    createdAt: 1500002
  };
  store.dispatch(startAddExpense(data)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
      ...data
      }
      
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(data);
    done();
  });
})

test('should add expense to database and store with defaults', (done) => {
  const store = createMockStore({});
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        description: "",
        note: '',
        amount: 0,
        createdAt: 0
       }
      
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  })
  .then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: "",
        note: '',
        amount: 0,
        createdAt: 0
    });
    done();
  });
});


test("should setup setExpense action", () => {
  const data = setExpenses(expenses);
  expect(data).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test('should setup startSetExpense action function', () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
  })
})
