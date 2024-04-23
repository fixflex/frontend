import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/signup/authSlice';
import taskReducer from '../components/task-list/taskSlice';
import userTasksReducer from '../features/post-task/taskSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';
import categoryReducer from '../features/task-category/categorySlice';
import allTasksReducer from '../features/browse/allTasksSlice';
import taskerInfoReducer from '../features/tasker-onboarding/taskerInfoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    userTasks: userTasksReducer,
    categories: categoryReducer,
    allTasks: allTasksReducer,
    taskerInfo: taskerInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
