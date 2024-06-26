import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/signup/authSlice';
import taskReducer from '../components/task-list/taskSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';
import categoryReducer from '../features/task-category/categorySlice';
import allTasksReducer from '../features/browse/allTasksSlice';
import taskerInfoReducer from '../features/tasker-onboarding/taskerInfoSlice';
import offersReducer from '../components/offers/offersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    categories: categoryReducer,
    allTasks: allTasksReducer,
    taskerInfo: taskerInfoReducer,
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
