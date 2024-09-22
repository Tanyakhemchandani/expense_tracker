const balance = document.getElementById("balance");
const money_plus = document.getElementById( 'money-plus' );
const money_minus = document.getElementById( 'money-minus' );
const list = document.getElementById("list");

const form = document.getElementById( 'form' ) ;
const text = document.getElementById('text');
const amount = document.getElementById( 'amount' );

/*
const dummyTransactions = [
    {id: 1, text: "Flower", amount: -20},
    {id: 2, text:"Salary", amount: 300},
    {id:3, text:"Book", amount: -50},
    {id: 4, text: "Camera", amount: 150},
];
*/


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions")!== null? localStorageTransactions:[] ;

// addtransaction
function addTransaction(e)
{
    e.preventDefault(); // prevent the page from reloading when we submit our form
    
    if (text.value.trim() === "" || amount.value.trim()=== "")
    {
        alert("Please Enter Text And Amount");
    }
    else{
        const transaction={
            id:GenerateID(), 
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updatelocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

//Generate Id
function GenerateID()
{
    return Math.floor(Math.random()* 10000000);
}
function addTransactionDOM(transaction)
{
    const sign = transaction.amount < 0? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0? "minus" : "plus"
    )
    item.innerHTML = `
    ${transaction.text}<span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeHistory(${transaction.id})" > x </button>
    `;

    list.appendChild(item);
}

function removeHistory(id)
{
    transactions = transactions.filter(transaction => transaction.id !== id);
    updatelocalStorage();
    Init();
}

//To update values
function updateValues()
{
    const amounts = transactions.map(transaction => transaction.amount)
    const  total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    //Positive and Negative Balance 
    const income =( amounts.filter(item => item > 0).reduce((acc, item) => (acc+= item), 0)
    ).toFixed(2)
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2)
    balance.innerText = `Rs. ${total}`;
    money_plus.innerText= `+ Rs. ${income}`;
    money_minus.innerText=`-  Rs. ${expense}`;
}
//update local storage
function updatelocalStorage()
{
    localStorage.setItem(
        "transactions", JSON.stringify(transactions)
    );
}

//Init function because we are looping out the transaction particularly
function Init()
{
    list.innerHTML= "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();
form.addEventListener("submit",addTransaction );
