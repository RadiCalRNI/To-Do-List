const addBtnTask = document.querySelector("button");
const input = document.querySelector("input");
const taskList = document.querySelector(".taskList");
const taskListStorage = [];

if (localStorage.getItem("key")) {
  let items = localStorage.getItem("key");
  let arrayTask = items.split(",");
  arrayTask.forEach((item) => {
    taskListStorage.push(item);
  });
  loadPreviousTask(taskListStorage);
}

addBtnTask.addEventListener("click", () => {
  let text = input.value;
  if (text === "") return;
  let task = newTask(text);
  taskList.appendChild(task);
  addTaskToStorage(text);
  input.value = "";
});

taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("selected");
  } else if (event.target.tagName === "SPAN") {
    taskList.removeChild(event.target.parentElement);
    let removed = event.target.parentElement.textContent;
    removeTask(removed);
  }
});

function newTask(text) {
  let li = document.createElement("li");
  li.innerHTML = `${text}<span class="fa-solid fa-trash-can"></span>`;
  return li;
}

function addTaskToStorage(text) {
  taskListStorage.push(text);
  localStorage.setItem("key", taskListStorage);
}

function loadPreviousTask(taskListStorage) {
  taskListStorage.forEach((item) => {
    taskList.appendChild(newTask(item));
  });
}

function removeTask(removedTask) {
  let index = taskListStorage.indexOf(removedTask);
  taskListStorage.splice(index, 1);
  localStorage.setItem("key", taskListStorage);
  taskList.innerHTML = "";
  loadPreviousTask(taskListStorage);
}
