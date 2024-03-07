import { createSlice } from '@reduxjs/toolkit';

const persistedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');

const initialState = {
  tasks: persistedTasks,
};

export const allTasksSlice = createSlice({
  name: 'allTasks',
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('userTasks', JSON.stringify(state.tasks));
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
      localStorage.setItem('userTasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, deleteTask, addAllTasks, deleteAllTasks } =
  allTasksSlice.actions;

export default allTasksSlice.reducer;
