import { saveTasks } from './taskFunctions.js';

export const updateTaskStatus = (tasks, index, completed) => {
    tasks[index].completed = completed;
    saveTasks(tasks);
  };
  