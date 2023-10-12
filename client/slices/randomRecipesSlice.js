import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  randomRecipes: []
};

export const randomRecipesSlice = createSlice({
  name: 'randomRecipes',
  initialState,
  reducers: {
    populate: (state, action) => {
      state.randomRecipes.push(action.payload);
    },
    clear: (state) => {
      state.randomRecipes = [];
    },
  },
});

export const { populate, clear } = randomRecipesSlice.actions;

export default randomRecipesSlice.reducer;