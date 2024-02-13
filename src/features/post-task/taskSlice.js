import { createSlice } from '@reduxjs/toolkit';
const persistedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');

// Initial state for the offers slice
const initialState = {
  tasks: persistedTasks, // Initialize offers as an empty array
};

export const userTasks = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    // Action to add a new offer
    addTask: (state, action) => {
      // Assuming action.payload is the offer object to add
      state.tasks.push(action.payload);
    },
    // Action to delete an offer by id
    deleteTask: (state, action) => {
      // Assuming action.payload is the offer's id to delete
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addTask, deleteTask } = userTasks.actions;
export default userTasks.reducer;
