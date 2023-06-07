import './style.css';
import { addTask, deleteTask, editTask, saveTasks } from './taskFunctions.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const setCaretToEnd = (contentEditableElement) => {
  let range, selection;
  range = document.createRange();
  range.selectNodeContents(contentEditableElement);
  range.collapse(false);
  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

const renderTasks = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('row');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="editable">${task.description}</span>
      <i class="fas fa-ellipsis-v"></i>
      <i class="fas fa-trash-alt" style="display:none"></i>
    `;

    const trashIcon = listItem.querySelector('.fa-trash-alt');

    listItem.querySelector('input[type="checkbox"]').addEventListener('click', function () {
      tasks[index].completed = this.checked;
      saveTasks(tasks);
      renderTasks();
    });

    listItem.querySelector('.editable').addEventListener('click', function (event) {
      event.target.contentEditable = true;
      event.target.focus();
      setCaretToEnd(event.target);
      event.stopPropagation();
    });

    listItem.addEventListener('click', function (event) {
      const trashIcon = listItem.querySelector('.fa-trash-alt');
      const isSelected = listItem.classList.contains('selected');

      if (event.target !== trashIcon) {
        if (!isSelected) {
          listItem.classList.add('selected');
          trashIcon.style.display = 'inline';
          listItem.querySelector('.fa-ellipsis-v').style.display = 'none';
        } else {
          listItem.classList.remove('selected');
          trashIcon.style.display = 'none';
          listItem.querySelector('.fa-ellipsis-v').style.display = 'inline';
        }
      }
    });

    listItem.querySelector('.fa-trash-alt').addEventListener('click', function (event) {
      event.stopPropagation();
      tasks = deleteTask(tasks, index);
      renderTasks();
    });

    listItem.querySelector('.editable').addEventListener('blur', function () {
      this.contentEditable = false;
      tasks = editTask(tasks, index, this.textContent.trim());
    });

    if (task.completed) {
      listItem.querySelector('.editable').style.textDecoration = 'line-through';
    }

    taskList.appendChild(listItem);
  });
};

const taskInput = document.getElementById('task-input');
const taskForm = document.getElementById('task-form');

const handleAddTask = (event) => {
  event.preventDefault();
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== '') {
    tasks = addTask(tasks, taskDescription);
    taskInput.value = '';
    renderTasks();
    saveTasks(tasks);
  }
};

taskForm.addEventListener('submit', handleAddTask);

const enterIcon = document.querySelector('.icon-container');

enterIcon.addEventListener('click', (event) => {
  event.preventDefault();
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== '') {
    tasks = addTask(tasks, taskDescription);
    taskInput.value = '';
    renderTasks();
    saveTasks(tasks);
  }
});

enterIcon.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== '') {
      tasks = addTask(tasks, taskDescription);
      taskInput.value = '';
      renderTasks();
      saveTasks(tasks);
    }
  }
});

renderTasks();
saveTasks(tasks);
