## Building a budget-calculator with react hooks.

I like to  get used with react hooks while using react. The structure of this project is very similar to the todo app
I build a while ago, using CRUD operations in frontend.

### Create a new react project
As always, I use Create React App, to skip all the manual build configurations with babel, webpack, etc.
````javascript
npx create-react-app budget-calculator
````

### Structure of the app
It is going to be a one-page app, so I am going to use App.js as the parent component. There are four children components 
in the components folder: ```Alert.js``` for page updates; ````ExpenseForm.js````for adding/editing expense; ````ExpenseItem.js````
for displaying each expense; ````ExpenseList.js````for displaying all the items. 


### Add state with useState and useEffect Hooks
State allows us to track change inside of react components. The budget-calculator list changes quite frequently. For example:
* Adding(id, charge, amount parameters) new expense
* Editing existed expense
* Deleting expense
* Giving alert

Import useState Hook alongside where React is imported:
````javascript
import React, { useState, useEffect } from 'react'
````

Grab items from localstorage:
````javascript
const getSavedExpenses = () => {
    let expenses = localStorage.getItem('expenses')

    if(expenses) {
        return JSON.parse(expenses)
    }

    return []
}
````
Initialize the state properties needed for this app:
````javascript
const [ expenses, setExpenses ] = useState(getSavedExpenses())
const [ charge, setCharge ] = useState("")
const [ amount, setAmount ] = useState("")
const [ alert, setAlert ] = useState({ show: false })
const [ edit, setEdit ] = useState(false)
const [ id, setId ] = useState(0)
````

Hooking the initial state in the DOM using useEffect:
````javascript
 useEffect( ()=>{
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])
````

### Add expense:

We need to have functions to handle changes of state of charge and expense:
````javascript
   const handleCharge = (event)=>{
        setCharge(event.target.value)
    }

    const handleAmount = (event) =>{
        let amount = event.target.value
        if(amount === ""){
            setAmount(amount)
        }
        setAmount(parseInt(amount))
    }
````

We need a submit function to add the current state of charge and amount into the expenses list:
````javascript
const handleSubmit = (event) => {
        event.preventDefault()
        if( charge !== "" && amount > 0){
            if(edit){
                let editExpenses = expenses.map(item =>{
                    return item.id === id ? { ...item, charge, amount } : item
                })
                setExpenses(editExpenses)
                setEdit(false)
            }else{
                const currentExpense = { id: uuid(), charge, amount }
                setExpenses([ ...expenses, currentExpense])
                handleAlert({
                    type: "success",
                    text: "Item added"
                })
            }
            setCharge("")
            setAmount("")

        }else{
            handleAlert({
                type: "danger",
                text: "Please add an item with valid amount"
            })
        }
    }
````

This three functions are passed on to the ````ExpenseForm.js```` as props:
````javascript
const ExpenseForm = ({
    charge,
    amount,
    edit,
    handleCharge,
    handleAmount,
    handleSubmit
}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="expense">Charge</label>
                    <input
                        type = "text"
                        className="form-control"
                        id="charge"
                        name="charge"
                        placeholder="e.g. Mortgage"
                        value = { charge }
                        onChange = { handleCharge }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type = "number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="e.g. 1000"
                        value = { amount }
                        onChange = { handleAmount }
                    />
                </div>
            </div>

            <button type = "submit" className="btn">
                {edit ? "edit" : "submit"}
                <i className="fa fa-gavel btn-icon"></i>
            </button>

        </form>
    )
}
````
### Handle edit and delete budget item
We need functions to handle delete and edit an item:
````
    const handleDelete = (id) => {
        let filteredExpenses = expenses.filter(item => item.id !== id)
        setExpenses(filteredExpenses)
        handleAlert({
            type: "danger",
            text: "Item deleted"
        })
    }
    
    const handleEdit = (id) =>{
        let currentExpense = expenses.find(item=> item.id === id)
        let { charge, amount } = currentExpense
        setCharge(charge)
        setAmount(amount)
        setEdit(true)
        setId(id)
    }    
````

These two functions are passed to ````ExpenseList.js```` as props. ````ExpenseList.js```` map through each item and passed 
the above two functions as props to ````ExpenseItem.js````:
````javascript
const ExpenseList =({
    expenses,
    handleDelete,
    handleEdit,
    clearList
}) => {
    return(
        <div>
            <ul className="list">
                { expenses.map(expense =>{
                    return(
                        <ExpenseItem
                          key = { expense.id }
                          expense = { expense }
                          handleDelete={ handleDelete }
                          handleEdit={ handleEdit }
                        />
                    )
                })}
            </ul>

            {expenses.length > 0 && (
                <button className="btn" onClick = {clearList}>
                   Clear Expenses
                    < i className="fa fa-trash btn-icon"></i>
                </button>
            )}
        </div>
    )
}
````
````ExpenseItem.js```` display content of each expense and handle delete and edit:
````javascript
const ExpenseItem = ({
    expense: { id, charge, amount },
    handleDelete,
    handleEdit
}) => {
    return(
        <li className= "item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button
                    className='edit-btn'
                    onClick={()=>handleEdit(id)}
                >
                    < i className="fa fa-edit"></i>
                </button>
                <button
                    className='clear-btn'
                    onClick={()=>handleDelete(id)}
                >
                    < i className="fa fa-trash"></i>
               </button>
            </div>
        </li>
    )
}
````

### Handle alert
````handleAlert```` Alert object has show, type and text attrbuts. It is called when an item is added, deleted or when no 
item is not valid.
````javascript
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text })
        setTimeout( ()=>{
            setAlert({ show: false })
        }, 7000)
    }
````
It is passes to ````Alert.js```` as prop:
````javascript

const Alert = ({ type,text }) => {
    return <div className = {`alert alert-${type}`}>{text}</div>
}
````

### Links
* [Github](https://github.com/sufanHuang/budget-calculator)
* [View](https://budget-calculator-sufan.netlify.com/)
* [Reference](https://www.youtube.com/watch?v=f6HYLHrYpGs&t=2s)
