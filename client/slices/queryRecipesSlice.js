import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  queryRecipes: []
};

export const queryRecipesSlice = createSlice({
  name: 'queryRecipes',
  initialState,
  reducers: {
    populate: (state, action) => {
      state.queryRecipes.push(action.payload);
    },
    clear: (state) => {
      state.queryRecipes = [];
    },
  },
});

export const { populate, clear } = queryRecipesSlice.actions;

export default queryRecipesSlice.reducer;