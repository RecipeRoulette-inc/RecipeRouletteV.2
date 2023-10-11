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
     * Will need the index of the card as the action.payload OR included in it that this recipe lives on in order to splice 
     * it off of the state AND the userDoc's savedRecipe property.
     */
    removeRecipe: (state, action) => {
      state.savedRecipes.splice(action.payload, 1);
    }
  },
});

export const { saveRecipe, removeRecipe } = savedRecipesSlice.actions;

export default savedRecipesSlice.reducer;