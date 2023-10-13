import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  queryStatus: false,
  queryRecipes: [],
  queryRecipesUnder30State: [],
  queryRecipesGluttenFreeState: [],
};

export const queryRecipesSlice = createSlice({
  name: 'queryRecipes',
  initialState,
  reducers: {
    populateMain: (state, action) => {
      state.queryRecipes.push(action.payload);
    },
    clearMain: (state) => {
      state.queryRecipes = [];
    },
    queryMade: (state) => {
      state.queryStatus = true;
    },
    queryEnded: (state) => {
      state.queryStatus = false;
    }
  },
});

export const { populate, clear } = queryRecipesSlice.actions;

export default queryRecipesSlice.reducer;