import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedRecipes: []
};

// all actions are generalized in terms of the payload, will have to refactor based on how the API presents the information
export const savedRecipesSlice = createSlice({
  name: 'savedRecipes',
  initialState,
  reducers: {
    saveRecipe: (state, action) => {
      state.savedRecipes.push(action.payload);
    },
    /**
     * Instead of individual card index, use totalSaved state from flipCardSlice.js or savedRecipes.length... 
     * Either one indicates the number of saved recipies, making removeRecipe function properly.
     */
    removeRecipe: (state, action) => {
      state.savedRecipes.splice(action.payload, 1);
    }
  },
});

export const { saveRecipe, removeRecipe } = savedRecipesSlice.actions;

export default savedRecipesSlice.reducer;