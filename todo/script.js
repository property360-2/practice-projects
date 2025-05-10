document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const taskText = taskInput.value.trim();
        if (taskText === "") {
            taskInput.focus();
            return;
        }

        const listItem = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.setAttribute("tabindex", "0"); // Focusable for screen readers

        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.setAttribute("aria-label", "Mark task as done");
        doneButton.addEventListener("click", function () {
            taskSpan.classList.toggle("done");
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(doneButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        taskInput.focus(); // Return focus to input
    });
});
