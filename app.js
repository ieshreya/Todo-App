// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list')
const filterTodos = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodos.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  saveLocalTodos(todoInput.value); //save local todos.
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoInput.value = '';
  //buttons:checked
  const checkedBtn = document.createElement('button');
  checkedBtn.innerHTML = '<i class="fas fa-check"></i>'
  checkedBtn.classList.add("checked-btn");
  todoDiv.appendChild(checkedBtn);

  //buttons:trash
  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  // Append to the main List
  todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
  const item = e.target;
  // Delete todo:
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });

  }

  // Check Todo:
  if (item.classList[0] === 'checked-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.querySelectorAll(".todo");
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
}


// Local Storage
function saveLocalTodos(todo) {
  // checking..
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else { //so that we can get back our previous todo list we've created before closing it. (saved to local storage)
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // if we do have previously made todos, we'll just add them to our todo.
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //buttons:checked
    const checkedBtn = document.createElement('button');
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>'
    checkedBtn.classList.add("checked-btn");
    todoDiv.appendChild(checkedBtn);

    //buttons:trash
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    // Append to the main List
    todoList.appendChild(todoDiv);
  });

}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
  const todoIndex =todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
