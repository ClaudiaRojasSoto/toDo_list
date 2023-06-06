
import './style.css';

// Initial tasks array
const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 }
];

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.description}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <i class="fas fa-ellipsis-v"></i>
    `;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    taskList.appendChild(listItem);
  });
}

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', event => {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  const newTask = {
    description: taskInput.value,
    completed: false,
    index: tasks.length + 1
  };
  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
});

// Initial rendering of tasks
renderTasks();
