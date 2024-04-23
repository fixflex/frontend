import { createSlice } from '@reduxjs/toolkit';
const persistedTaskerInfo = JSON.parse(localStorage.getItem('taskerInfo')) || {
  city: '',
  specialty: {
    name: '',
    id: '',
  },
  isTasker: false,
};

const taskerInfoSlice = createSlice({
  name: 'taskerInfo',
  initialState: persistedTaskerInfo,
  reducers: {
    setTaskerInfo(state, action) {
      state.city = action.payload.city;
      state.specialty = action.payload.specialty;
      state.isTasker = action.payload.isTasker;
    },
    setIsTasker(state, action) {
      state.isTasker = action.payload;
    },
  },
});

export const { setTaskerInfo, setIsTasker } = taskerInfoSlice.actions;
export default taskerInfoSlice.reducer;
