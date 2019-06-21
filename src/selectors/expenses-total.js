

export default (expenses = []) => {
    let amount = 0;
    if(expenses){
        expenses.forEach((expense) => {
            return amount += expense.amount
        });
    }
    
    return amount;
}