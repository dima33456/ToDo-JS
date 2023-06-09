let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')


function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    if (todos[index].done) {
      element.classList.add('todo_done');
    }
    element.innerHTML = `
      <div class="todo__day">Дело ${Number(index) + 1}</div>
      <div class="todo__comment">${todos[index].text}</div>
      <div class="todo__btns">
        <input class="todo__checkbox" ${todos[index].done ? 'checked' : ''} type="checkbox" onchange="changeDone(${Number(index)})" />
        <button class="todo__delete" onclick="deleteTodo(${index})">
          <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
        </button>
      </div>
    `;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}


/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }
  
  todos.push({
    text: data,
    done: false
  })
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function changeDone(index) {
  todos[index].done = !todos[index].done;
  rerender();
  saveData();
}

/* init */
(() => {
  loadData();
  rerender();
})();