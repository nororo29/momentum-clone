const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoItems = document.querySelector(".js-toDoItems"),
  addBtn = toDoForm.querySelector("button"),
  clearBtn = document.querySelector("#clearBtn");

const TODOS_LS = 'toDos'

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoItems.removeChild(li);

  const clearToDos = toDos.filter(function(toDo) {
    return toDo.id != li.id;
  });

  toDos = clearToDos;
  saveToDos(toDos);
}

function checkToDo(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;

  toDos.forEach(function(toDo) {
    if(toDo.id == li.id) {
      toDo.completed = !toDo.completed;
    }
  });

  li.classList.toggle('checked');

  saveToDos(toDos);
}

function renderToDos(toDo) {
  const checked = toDo.completed ? 'checked' : null;
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const checkmark = document.createElement('span');
  const deleteBtn = document.createElement('button');
  const span = document.createElement('span');

  li.setAttribute('class', 'toDo');
  li.setAttribute('id', toDo.id);
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkmark.classList.add('checkmark');
  span.innerText = toDo.text;
  span.classList.add('todoitem');
  deleteBtn.innerText = "x";
  deleteBtn.classList.add('delete-button');

  deleteBtn.addEventListener('click', deleteToDo);
  checkbox.addEventListener('click', checkToDo);
  li.addEventListener('click', function(){checkbox.click();});

  if(toDo.completed === true) {
    li.classList.add('checked');
    checkbox.checked = true;
  }

  li.appendChild(checkbox);
  li.appendChild(checkmark);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  toDoItems.appendChild(li);
}

function saveToDos(toDos) {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function addToDo(text) {
  const toDo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  
  renderToDos(toDo);
  toDos.push(toDo);
  saveToDos(toDos);

  toDoInput.value = '';
}

function handleSubmit(event) {
  if(toDoInput.value) {
    event.preventDefault();
    addToDo(toDoInput.value);
  } else {
    alert("Write to do")
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if(loadedToDos) {
    toDos = JSON.parse(loadedToDos);
    toDos.forEach(renderToDos);
  }
}

function clearToDos(event) {
  toDos = [];
  toDoItems.innerHTML = '';
  saveToDos(toDos);
}

function init() {
  loadToDos();
  addBtn.addEventListener("click", handleSubmit);
  clearBtn.addEventListener("click", clearToDos);
}

init();
