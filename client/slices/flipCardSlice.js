import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalSaved: 0,
  saved: false,
  gluttenFree: false,
  vegetarian: false,
  dairyFree: false,
};


export const flipCardSlice = createSlice({
  name: 'flipCard',
  initialState,
  reducers: {
    save: (state) => {
      state.saved = true;
      state.totalSaved += 1;
    },
    unsave: (state) => {
        state.saved = false;
        state.totalSaved -= 1;
    },
    isGluttenFree: (state) => {
        state.gluttenFree = true;
    },
    notGluttenFree: (state) => {
        state.gluttenFree = false;
    },
    isVegetarian: (state) => {
        state.vegetarian = true;
    },
    notVegetarian: (state) => {
        state.vegetarian = false;
    },
    isDairyFree: (state) => {
        state.dairyFree = true;
    },
    notDairyFree: (state) => {
        state.dairyFree = false;
    },
  },
});

export const { save, unsave } = flipCardSlice.actions;

export default flipCardSlice.reducer;