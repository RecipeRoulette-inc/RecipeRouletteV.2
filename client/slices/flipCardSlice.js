import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saved: false,
  gluttenFree: false,
  vegetarian: false,
  dairyFree: false,
};


export const flipCardSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    save: (state) => {
      state.saved = true;
    },
    unsave: (state) => {
        state.saved = false;
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

export const { saveRecipe, removeRecipe } = flipCardSlice.actions;

export default flipCardSlice.reducer;