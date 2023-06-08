import { saveTasks } from './taskFunctions.js';

const updateTaskStatus = (tasks, index, completed) => {
  tasks[index].completed = completed;
  saveTasks(tasks);
};

export default updateTaskStatus;
