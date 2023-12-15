document.addEventListener("DOMContentLoaded", function () {
    // Obté referències als elements del DOM
    var newTaskInput = document.getElementById("new-task");
    var addTaskButton = document.querySelector("button");
    var filterInput = document.getElementById("filter-task");
    var incompleteTasks = document.getElementById("incomplete-tasks");
    var completedTasks = document.getElementById("completed-tasks");
  
    // Funció per afegir una nova tasca
    function addTask() {
      var taskText = newTaskInput.value;
  
      if (taskText.trim() !== "") {
        // Crea nous elements HTML per la tasca
        var li = document.createElement("li");
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        var deleteButton = document.createElement("button");
  
        // Configura els elements
        checkBox.type = "checkbox";
        label.textContent = taskText;
        deleteButton.textContent = "Delete";
  
        // Afegeix els elements al DOM
        li.appendChild(checkBox);
        li.appendChild(label);
        li.appendChild(deleteButton);
        incompleteTasks.appendChild(li);
  
        // Afegeix un event listener per a marcar com a finalitzada
        checkBox.addEventListener("change", completeTask);
  
        // Afegeix un event listener per a eliminar la tasca
        deleteButton.addEventListener("click", deleteTask);
  
        // Neteja l'input
        newTaskInput.value = "";
      }
    }
  
    // Funció per filtrar les tasques en temps real
    function filterTasks() {
        var filterText = filterInput.value.toLowerCase();
        var tasks = incompleteTasks.getElementsByTagName("li");
      
        for (var i = 0; i < tasks.length; i++) {
          var task = tasks[i];
          var label = task.querySelector("label");
          var taskText = label.textContent.toLowerCase();
          var displayStyle = taskText.includes(filterText) ? "block" : "none";
      
          task.style.display = displayStyle;
        }
      }
      
      
  
    // Funció per marcar la tasca com a finalitzada
    function completeTask() {
        var task = this.parentElement;
        var label = task.querySelector("label");
      
        // Cambia visualmente la tarea completada
        label.style.textDecoration = "line-through";
        label.style.color = "purple";
      
        // Añade la tarea a la lista de tareas completadas
        completedTasks.appendChild(task);
      
        // Elimina el checkbox y el botón de delete
        var checkBox = task.querySelector("input[type=checkbox]");
        var deleteButton = task.querySelector("button");
        checkBox.remove();
        deleteButton.remove();
      
        // Añade un nuevo botón de delete que borra la tarea completada
        var newDeleteButton = document.createElement("button");
        newDeleteButton.innerText = "Delete";
        newDeleteButton.className = "delete";
        task.appendChild(newDeleteButton);
      
        // Asigna el evento de eliminar a este nuevo botón de delete
        newDeleteButton.addEventListener("click", deleteTask);
      }
      
  
    // Funció per eliminar una tasca
    function deleteTask() {
      var task = this.parentElement;
      task.remove();
    }
  
    // Afegeix un event listener al botó d'afegir tasca
    addTaskButton.addEventListener("click", addTask);
  
    // Afegeix un event listener a l'input de filtrar tasques
    filterInput.addEventListener("input", filterTasks);
  });
  
