const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Persistence for userTasks
  if (
    action.type === 'userTasks/addTask' ||
    action.type === 'userTasks/deleteTask'
  ) {
    const updatedTasks = store.getState().userTasks.tasks;
    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
  }

  // Persistence for taskerInfo
  if (
    action.type === 'taskerInfo/setTaskerInfo' ||
    action.type === 'taskerInfo/setIsTasker'
  ) {
    const taskerInfo = store.getState().taskerInfo;
    localStorage.setItem('taskerInfo', JSON.stringify(taskerInfo));
  }

  return result;
};

export default localStorageMiddleware;
