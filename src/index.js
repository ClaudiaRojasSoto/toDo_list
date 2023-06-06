import './style.css';

const tasks = [
  { description: 'Feed Kira', completed: false, index: 1 },
  { description: 'Clean the garden', completed: false, index: 2 },
  { description: 'Make fruit salad', completed: false, index: 3 }
];

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

  const taskFormRow = document.getElementById('task-form-row');
  if (!document.getElementById('enter-icon')) {
    const enterIcon = document.createElement('i');
    enterIcon.id = 'enter-icon';
    enterIcon.className = 'fas fa-keyboard-return';
    taskFormRow.appendChild(enterIcon);
  }
}

renderTasks();
