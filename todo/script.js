document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Load saved tasks from localStorage and render them
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            createTaskElement(task.text, task.done);
        });
    }

    // Save all current tasks in the list to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            const text = li.querySelector("span").textContent;
            const done = li.querySelector("span").classList.contains("done");
            tasks.push({ text, done });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a task list item and add event listeners
    function createTaskElement(taskText, done = false) {
        const listItem = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.setAttribute("tabindex", "0");
        if (done) taskSpan.classList.add("done");

        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.setAttribute("aria-label", "Mark task as done");
        doneButton.addEventListener("click", function () {
            taskSpan.classList.toggle("done");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
            saveTasks();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(doneButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") {
            taskInput.focus();
            return;
        }

        createTaskElement(taskText);
        saveTasks();

        taskInput.value = "";
        taskInput.focus();
    });

    loadTasks();
});
s