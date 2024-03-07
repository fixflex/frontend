import { createSlice } from '@reduxjs/toolkit';
const persistedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');

const initialState = {
  tasks: persistedTasks,
};

export const userTasks = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, deleteTask } = userTasks.actions;
export default userTasks.reducer;
