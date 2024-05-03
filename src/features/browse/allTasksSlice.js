import { createSlice } from '@reduxjs/toolkit';

const persistedTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');

const initialState = {
  tasks: persistedTasks,
};

export const allTasksSlice = createSlice({
  name: 'allTasks',
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('allTasks', JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('allTasks', JSON.stringify(state.tasks));
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
      localStorage.setItem('allTasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        console.log('====>', { ...state.tasks[index], ...action.payload });
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        localStorage.setItem('allTasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { updateTask, addTask, addAllTasks, deleteAllTasks } =
  allTasksSlice.actions;

export default allTasksSlice.reducer;
