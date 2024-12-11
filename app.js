let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        tasks = storedTasks;
        updateTaskList();
    }
});

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text == "") {
        alert("Enter a valid task");
        
    }
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; 
        updateTaskList(); 
        saveTasks();
    }
};

const toggletaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTasks();  
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList(); 
    saveTasks();  
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    const task = tasks[index];
    const editButton = document.querySelector(`#edit-btn-${index}`);
    const deleteButton = document.querySelector(`#delete-btn-${index}`);
    if (editButton.textContent === "Edit") {
        taskInput.value = task.text;  
        editButton.textContent = "Update";  
        deleteButton.disabled = true;  
    } 
    else { 
        const newText = taskInput.value.trim();
        if (newText !== "") {
            tasks[index].text = newText;  
            updateTaskList();  
            saveTasks();  
        }

        editButton.textContent = "Edit";  
        deleteButton.disabled = false;  
        taskInput.value = "";
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("tasklist");
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        let listItem = document.createElement("li");
        listItem.id = `task-${index}`;

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggletaskComplete(${index})">
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <button id="edit-btn-${index}" type="button" onClick="editTask(${index})">Edit</i></button>
                    <button id="delete-btn-${index}" type="button" onClick="deleteTask(${index})"><i class="fa fa-trash" style="color: red;"></i></button>
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

