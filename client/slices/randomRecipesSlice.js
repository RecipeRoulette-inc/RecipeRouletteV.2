import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  randomRecipes: []
};

export const randomRecipesSlice = createSlice({
  name: 'randomRecipes',
  initialState,
  reducers: {
    populate: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.randomRecipes.push(action.payload[i]);
      }
    },
    clear: (state) => {
      state.randomRecipes = [];
    },
  },
});

export const { populate, clear } = randomRecipesSlice.actions;

export default randomRecipesSlice.reducer;