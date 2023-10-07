import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newestRecipe: '',
  recipesTotal: 0,
  recipeList: []
};

// all actions are generalized in terms of the payload, will have to refactor based on how the API presents the information
export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.newestRecipe = action.payload.name;
      state.recipeTotal += 1;
      state.recipeList.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipeTotal -= 1;
      state.recipeList.splice(action.payload.index, 1);
    }
  },
});

export const { addRecipe, removeRecipe } = apiSlice.actions;

export default apiSlice.reducer;