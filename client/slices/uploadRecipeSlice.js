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
            // back space doesn't work -- will need to fix this logic 
            if (action.payload === 'Backspace') {
                state.recipeName = state.recipeName.slice(0, -1);
            } else {
                state.recipeName += action.payload[action.payload.length - 1];
                console.log(state.recipeName)
            }
            console.log(action.payload, 'after')
        },
        changeInstructions: (state, action) => {
            state.recipeName += action.payload[action.payload.length - 1];
        },
        changeCountry: (state, action) => {
            state.countryOfOrigin = action.payload;
        },
    },
});

export const { uploadRecipe, changeRecipeName, changeInstructions, changeCountry } = uploadRecipeSlice.actions;
export default uploadRecipeSlice.reducer;