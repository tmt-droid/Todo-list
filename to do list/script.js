//Variable
const addTaskBtn = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");

//Function for addTask
function addTask() {
  let task = document.createElement("div");
  task.classList.add("task");

  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;
  task.appendChild(li);

  let buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("task-buttons");

  let checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class ="fa-solid fa-check"></i>';
  checkButton.classList.add("checkTask");
  buttonsContainer.appendChild(checkButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class ="fa-solid fa-trash-can"></i>';
  deleteButton.classList.add("deleteTask");
  buttonsContainer.appendChild(deleteButton);

  task.appendChild(buttonsContainer);

  if (inputTask.value === "") {
    alert("Please enter a task");
  } else {
    taskContainer.appendChild(task);
    //save task in local storage
    saveTask(inputTask.value);
  }

  inputTask.value = "";

  checkButton.addEventListener("click", function () {
    let liElement = checkButton.parentElement.parentElement.querySelector("li");
    let completed =
      liElement.style.textDecoration === "line-through" ? false : true;
    liElement.style.textDecoration = completed ? "line-through" : "none";
    updateTaskStatus(liElement.innerText, completed);
  });

  deleteButton.addEventListener("click", function (e) {
    let liElement =
      deleteButton.parentElement.parentElement.querySelector("li");
    removeTask(liElement.innerText);
    deleteButton.parentElement.parentElement.remove();
  });
}

function updateTaskStatus(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) => {
    if (task.text === text) {
      task.completed = completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(text) {
  //This is used to make tasks an array using the OR statement since if
  //we get tasks it gives null
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //Add New task
  tasks.push({ text: text, completed: false });
  //Now save the array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskObj) => {
    let task = document.createElement("div");
    task.classList.add("task");

    let li = document.createElement("li");
    li.innerText = taskObj.text;
    if (taskObj.completed) {
      li.style.textDecoration = "line-through";
    }
    task.appendChild(li);

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("task-buttons");

    let checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class ="fa-solid fa-check"></i>';
    checkButton.classList.add("checkTask");
    buttonsContainer.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class ="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("deleteTask");
    buttonsContainer.appendChild(deleteButton);

    task.appendChild(buttonsContainer);
    taskContainer.appendChild(task);

    checkButton.addEventListener("click", function () {
      let liElement =
        checkButton.parentElement.parentElement.querySelector("li");
      let completed =
        liElement.style.textDecoration === "line-through" ? false : true;
      liElement.style.textDecoration = completed ? "line-through" : "none";
      updateTaskStatus(liElement.innerText, completed);
    });

    deleteButton.addEventListener("click", function (e) {
      let liElement =
        deleteButton.parentElement.parentElement.querySelector("li");
      removeTask(liElement.innerText);
      deleteButton.parentElement.parentElement.remove();
    });
  });
}

window.addEventListener("DOMContentLoaded", loadTasks);
