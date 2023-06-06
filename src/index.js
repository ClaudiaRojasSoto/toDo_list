import './style.css';

// Initial tasks array
const tasks = [
  { description: 'Feed Kira', completed: false, index: 1 },
  { description: 'Clean the garden', completed: true, index: 2 },
  { description: 'make fruit salad', completed: false, index: 3 }
];

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.classList.add('row');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
      <i class="fas fa-ellipsis-v"></i>
    `;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    taskList.appendChild(listItem);
  });
}

// Initial rendering of tasks
renderTasks();
