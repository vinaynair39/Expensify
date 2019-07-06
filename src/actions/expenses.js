import  database  from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
  });

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const{
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    
    const expense = {description,amount,note,createdAt};
    return database.ref('expenses').push(expense).then((ref)=> {
      console.log(ref.key);
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

export const editExpense = (id, updates = {}) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const setEditExpense = (id, updates ={}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then((ref)=> {
      dispatch(editExpense(id, updates));
    });
  };
};
  export const removeExpense = (id) => ({
    type: "REMOVE_EXPENSE",
    id
  });
  


  
export const setExpenses = (expenses) => {
  return {
    type: "SET_EXPENSES",
    expenses
  };
}

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenses(expenses));
    })
    }
  }

export const setRemoveExpense = (id) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(id));
    });
  }
}