const body = document.querySelector('body');
const ul = document.querySelector('ul');

const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

var values = []
displayList()

function handleFormSubmit(event) {
  event.preventDefault();

  const data = {
    amount: amount.value,
    expense: expense.value,
    category: category.value
  }
  uniqueId = Math.random().toString(16).slice(2)
  localStorage.setItem(uniqueId, JSON.stringify(data));

  amount.value = '';
  expense.value = '';
  category.value = '';
  displayList()
}

function displayList() {
  values = []
  ul.innerHTML = '';
  keys = Object.keys(localStorage),
    console.log(keys);
  i = keys.length;

  while (i--) {
    values.unshift(localStorage.getItem(keys[i]));
  }

  for (let i = 0; i < values.length; i++) {
    const li = document.createElement('li');
    li.id = keys[i];
    let data = JSON.parse(localStorage.getItem(keys[i]));
    li.textContent = data.amount + '-' + data.expense + '-' + data.category;

    let btn = document.createElement('button');
    btn.textContent = "Delete Expense";
    btn.id = "delete-btn";
    li.appendChild(btn);

    let ebtn = document.createElement('button');
    ebtn.textContent = "Edit Expense";
    ebtn.id = "edit-btn";
    li.appendChild(ebtn);

    ul.appendChild(li);



  }

}

const deleteBtn = document.querySelectorAll('#delete-btn');
console.log(deleteBtn);  
deleteBtn.forEach((delBtn) => {
  delBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let listItem = this.parentElement;

    console.log(listItem.id);
    listItem.remove();
    localStorage.removeItem(listItem.id);
  })
})


const editBtn = document.querySelectorAll('#edit-btn');
// console.log(deleteBtn);  
editBtn.forEach((edtBtn) => {
  edtBtn.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("edit btn clicked")
    let listItem = this.parentElement;
    let reqData = JSON.parse(localStorage.getItem(listItem.id));

    console.log(listItem.id, reqData);
    listItem.remove();
    amount.value = reqData.amount;
    expense.value = reqData.expense;
    category.value = reqData.category;
    localStorage.removeItem(listItem.id);
  })
})
