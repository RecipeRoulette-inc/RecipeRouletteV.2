import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    populateUserRecipe: {},
    recipeName: '',
    instructions: '',
    countryOfOrigin: '',
};

export const uploadRecipeSlice = createSlice({
    name: 'uploadRecipe',
    initialState,
    reducers: {
        uploadRecipe: (state, action) => {
            state.populateUserRecipe = { ...action.payload }
        },
        changeRecipeName: (state, action) => {
            if (action.payload === 'Backspace') {
                state.recipeName = state.recipeName.slice(0, -1);
            } else {
                state.recipeName = action.payload;
                console.log(state.recipeName)
            }
        },
        changeInstructions: (state, action) => {
            if (action.payload === 'Backspace') {
                state.instructions = state.instructions.slice(0, -1);
            } else {
                state.instructions = action.payload;
            }
        },
        changeCountry: (state, action) => {
            state.countryOfOrigin = action.payload;
        },
        clearFields: (state) => {
            state.recipeName = '';
            state.instructions = '';
        },
    },
});

export const { uploadRecipe, changeRecipeName, changeInstructions, changeCountry, clearFields } = uploadRecipeSlice.actions;
export default uploadRecipeSlice.reducer;