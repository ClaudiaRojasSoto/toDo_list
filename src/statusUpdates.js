export const updateTaskStatus = (tasks, index, completed) => {
    tasks[index].completed = completed;
    saveTasks(tasks);
    renderTasks();
  };
  