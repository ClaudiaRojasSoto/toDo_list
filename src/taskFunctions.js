export function addTask(tasks, description) {
    const task = {
      description,
      completed: false,
      index: tasks.length + 1
    };
    tasks.push(task);
    saveTasks(tasks);
    return tasks;
  }
  
  export function deleteTask(tasks, index) {
    tasks.splice(index, 1);
    tasks.forEach((task, i) => {
      task.index = i + 1;
    });
    saveTasks(tasks);
    return tasks;
  }
  
  export function editTask(tasks, index, newDescription) {
    tasks[index].description = newDescription;
    saveTasks(tasks);
    return tasks;
  }
  
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  export { saveTasks };
  