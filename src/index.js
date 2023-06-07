import './style.css';
import { addTask, deleteTask, editTask, saveTasks } from './taskFunctions.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function setCaretToEnd(contentEditableElement) {
  var range, selection;
  range = document.createRange();
  range.selectNodeContents(contentEditableElement);
  range.collapse(false);
  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('row');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="editable" contenteditable="false">${task.description}</span>
      <i class="fas fa-ellipsis-v"></i>
      <i class="fas fa-trash-alt" style="display:none"></i>
    `;

    const trashIcon = listItem.querySelector('.fa-trash-alt');

    listItem.querySelector('input[type="checkbox"]').addEventListener('click', function () {
      tasks[index].completed = this.checked;
      saveTasks(tasks);
      renderTasks();
    });

    listItem.querySelector('.editable').addEventListener('dblclick', function (e) {
      this.contentEditable = true;
      this.focus();
      setCaretToEnd(this);
      e.stopPropagation();
    });

    listItem.addEventListener('click', function (e) {
      this.classList.toggle('selected');
      trashIcon.style.display = this.classList.contains('selected') ? 'inline' : 'none';
      this.querySelector('.fa-ellipsis-v').style.display = this.classList.contains('selected') ? 'none' : 'inline';
    });

    listItem.querySelector('.fa-trash-alt').addEventListener('click', function (e) {
      e.stopPropagation();
      tasks = deleteTask(tasks, index);
      renderTasks();
    });

    listItem.querySelector('.editable').addEventListener('blur', function () {
      this.contentEditable = false;
      tasks = editTask(tasks, index, this.textContent.trim());
    });

    if (task.completed) {
      listItem.querySelector('span').style.textDecoration = 'line-through';
    }

    taskList.appendChild(listItem);
  });
}

document.getElementById('task-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== '') {
    tasks = addTask(tasks, taskDescription);
    taskInput.value = '';
    renderTasks();
    saveTasks(tasks);
  }
});

renderTasks();
saveTasks(tasks);