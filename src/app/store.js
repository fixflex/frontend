import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/signup/authSlice';
import taskReducer from '../components/task-list/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;
