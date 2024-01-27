import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    selectedTask: null,
  },
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { selectTask } = taskSlice.actions;

export default taskSlice.reducer;
