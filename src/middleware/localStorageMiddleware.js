const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Persistence for allTasks
  if (
    action.type === 'allTasks/addAllTasks' ||
    action.type === 'allTasks/addTask' ||
    action.type === 'allTasks/deleteAllTasks' ||
    action.type === 'allTasks/updateTask'
  ) {
    const updatedTasks = store.getState().allTasks.tasks;
    localStorage.setItem('allTasks', JSON.stringify(updatedTasks));
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
