const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = [];

// load tasks from browser memory
window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
};

// add task on button click
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

// add task on enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// render task list
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // animate appearance
    setTimeout(() => li.classList.add("show"), 50);

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) span.classList.add("completed");

    // toggle completed on click
    span.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      // animate removal
      li.style.opacity = 0;
      li.style.transform = "translateX(100%)";
      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }, 300);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // update counter
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  if (total === 0) {
    counter.innerHTML = `<span class="cool-emoji">😎</span> No tasks yet`;
  } else {
    counter.textContent = `Total: ${total} | Remaining: ${remaining}`;
  }
}
