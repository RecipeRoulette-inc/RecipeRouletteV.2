import { configureStore } from '@reduxjs/toolkit';
import authInputReducer from '../slices/authInputSlice';
import queryReducer from '../slices/querySlice';
import savedRecipesReducer from '../slices/savedRecipesSlice';
import flipCardReducer from '../slices/flipCardSlice';

export const store = configureStore({
    reducer: {
        authInput: authInputReducer,
        query: queryReducer,
        savedRecipes: savedRecipesReducer,
        flipCard: flipCardReducer
    }
});