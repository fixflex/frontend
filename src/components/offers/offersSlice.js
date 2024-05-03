import { createSlice } from '@reduxjs/toolkit';

const persistedOffers = JSON.parse(localStorage.getItem('userOffers') || '[]');

const initialState = {
  offers: persistedOffers,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addAllOffers: (state, action) => {
      state.offers = action.payload;
      localStorage.setItem('userOffers', JSON.stringify(state.offers));
    },
    addOffer: (state, action) => {
      state.offers.push(action.payload);
      localStorage.setItem('userOffers', JSON.stringify(state.offers));
    },
    deleteOffer: (state, action) => {
      state.offers = state.offers.filter(
        (offer) => offer._id !== action.payload._id
      );
      localStorage.setItem('userOffers', JSON.stringify(state.offers));
    },
    updateOffer: (state, action) => {
      const index = state.offers.findIndex(
        (offer) => offer._id === action.payload._id
      );
      if (index !== -1) {
        state.offers[index] = { ...state.offers[index], ...action.payload };
      }
      localStorage.setItem('userOffers', JSON.stringify(state.offers));
    },
  },
});

export const { addAllOffers, addOffer, deleteOffer, updateOffer } =
  offersSlice.actions;

export default offersSlice.reducer;
