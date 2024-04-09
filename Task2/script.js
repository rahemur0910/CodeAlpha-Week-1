window.addEventListener('scroll', function() {
    let inputContainer = document.getElementById('todoInputContainer');
    let scrollPosition = window.scrollY || window.pageYOffset;
  
    if (scrollPosition > 100) { 
      inputContainer.style.position = 'fixed';
      inputContainer.style.top = '0';
      inputContainer.style.left = '0';
      inputContainer.style.width = '100%';
      inputContainer.style.zIndex = '999';
    } else {
      inputContainer.style.position = 'static';
    }
  });
  
  let taskIdCounter = 0;
  
  function addTodo() {
    let inputField = document.getElementById("todoInput");
    let todoList = document.getElementById("todoList");
    let todoText = inputField.value;
  
    if (todoText.trim() !== "") {
      let listItem = document.createElement("li");
      let taskId = taskIdCounter++;
      listItem.id = taskId;
      listItem.innerHTML =
        '<span class="taskId">' +
        taskId +
        '</span>' +
        "<span>" +
        todoText +
        "</span>" +
        '<button class="completeButton" onclick="markCompleted(this)">Complete</button>' +
        '<button class="deleteButton" onclick="deleteTodo(this)">Delete</button>';
  
      todoList.appendChild(listItem);
      inputField.value = "";
    }
  }
  
  function deleteTodo(button) {
    let taskId = prompt("Enter the task ID you want to delete:");
  
    if (taskId !== null) {
      let listItem = document.getElementById(taskId);
      if (listItem !== null) {
        listItem.remove();
      } else {
        alert("Task with ID " + taskId + " not found!");
      }
    }
  }
  
  function markCompleted(button) {
    let listItem = button.parentElement;
    listItem.classList.toggle("completed");
    button.textContent = listItem.classList.contains("completed")
      ? "Undo"
      : "Complete";
  }
  
  let addButton = document.getElementById("addButton");
  addButton.addEventListener("click", function() {
    addTodo();
  });
  
  let inputField = document.getElementById("todoInput");
  inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
  
  document.addEventListener("keydown", function(event) {
    if (event.key === "Delete") {
      deleteTodo();
    }
  });
  