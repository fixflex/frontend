const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type === 'userTasks/addTask' ||
    action.type === 'userTasks/deleteTask'
  ) {
    const updatedTasks = store.getState().userTasks.tasks;
    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
  }

  return result;
};

export default localStorageMiddleware;
