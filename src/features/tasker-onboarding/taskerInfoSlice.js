import { createSlice } from '@reduxjs/toolkit';
const persistedTaskerInfo = JSON.parse(localStorage.getItem('taskerInfo')) || {
  specialtyId: '',
  isTasker: false,
};

const taskerInfoSlice = createSlice({
  name: 'taskerInfo',
  initialState: persistedTaskerInfo,
  reducers: {
    setTaskerInfo(state, action) {
      state.specialtyId = action.payload.specialtyId;
      state.isTasker = action.payload.isTasker;
    },
    setIsTasker(state, action) {
      state.isTasker = action.payload;
    },
  },
});

export const { setTaskerInfo, setIsTasker } = taskerInfoSlice.actions;
export default taskerInfoSlice.reducer;
