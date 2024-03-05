import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/signup/authSlice';
import taskReducer from '../components/task-list/taskSlice';
import userTasksReducer from '../features/post-task/taskSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';
import categoryReducer from '../features/task-category/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    userTasks: userTasksReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
