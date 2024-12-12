document.addEventListener("DOMContentLoaded", () => {
    const newTodoInput = document.getElementById("newTodo");
    const addButton = document.getElementById("addButton");
    const todoList = document.getElementById("todoList");

    addButton.addEventListener("click", () => {
        const task = newTodoInput.value.trim();
        if (task) {
            addTodo(task);
            newTodoInput.value = "";
        }
    });

    function addTodo(task) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;
        span.addEventListener("click", () => li.classList.toggle("completed"));

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => editTask(li, span));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => li.remove());

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function editTask(li, span) {
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask) {
            span.textContent = newTask.trim();
        }
    }
});
