import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dailyRecipe: {}
};

export const dailyRecipeSlice = createSlice({
  name: 'dailyRecipe',
  initialState,
  reducers: {
    populateDaily: (state, action) => {
      state.dailyRecipe = {...action.payload}
    },
    clearDaily: (state) => {
      state.dailyRecipe = {};
    },
  },
});

export const { populateDaily, clearDaily } = dailyRecipeSlice.actions;

export default dailyRecipeSlice.reducer;