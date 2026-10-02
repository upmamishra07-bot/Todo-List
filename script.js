// ==============================
// DOM ELEMENTS
// ==============================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");

const emptyState = document.getElementById("emptyState");
const clearCompleted = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");


// ==============================
// STATE
// ==============================

let tasks = [];

let currentFilter = "all";


// ==============================
// ADD TASK
// ==============================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    taskInput.focus();

    renderTasks();
}


// ==============================
// RENDER TASKS
// ==============================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filter
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );
    }


    // Empty state
    emptyState.style.display =
        filteredTasks.length === 0 ? "block" : "none";


    // Create task elements
    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkButton = document.createElement("button");

        checkButton.classList.add("check-btn");

        checkButton.setAttribute(
            "aria-label",
            "Mark task as completed"
        );


        // Toggle complete
        checkButton.addEventListener("click", () => {

            task.completed = !task.completed;

            renderTasks();
        });


        // Task text
        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "×";

        deleteButton.setAttribute(
            "aria-label",
            "Delete task"
        );


        // Delete task
        deleteButton.addEventListener("click", () => {

            tasks = tasks.filter(
                item => item.id !== task.id
            );

            renderTasks();
        });


        // Build task
        li.appendChild(checkButton);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });


    updateStats();
}


// ==============================
// UPDATE STATISTICS
// ==============================

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const active = total - completed;


    totalCount.textContent = total;

    activeCount.textContent = active;

    completedCount.textContent = completed;
}


// ==============================
// FILTER TASKS
// ==============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});


// ==============================
// CLEAR COMPLETED
// ==============================

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(
        task => !task.completed
    );

    renderTasks();
});


// ==============================
// ENTER KEY
// ==============================

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTask();
    }
});


// ==============================
// ADD BUTTON
// ==============================

addBtn.addEventListener("click", addTask);


// ==============================
// INITIAL RENDER
// ==============================

renderTasks();
