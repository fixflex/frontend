import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/signup/authSlice';
import taskReducer from '../components/task-list/taskSlice';
import userTasksReducer from '../features/post-task/taskSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    userTasks: userTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
