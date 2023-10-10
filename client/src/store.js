import { configureStore } from '@reduxjs/toolkit';
import authInputReducer from '../slices/authInputSlice';
import queryReducer from '../slices/querySlice';

export const store = configureStore({
    reducer: {
        authInput: authInputReducer,
        query: queryReducer
    }
});