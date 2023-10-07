import { configureStore } from '@reduxjs/toolkit';
import authInputReducer from '../slices/authInputSlice';
import apiReducer from '../slices/apiSlice';
import queryReducer from '../slices/querySlice';

export default configureStore({
    reducer: {
        authInput: authInputReducer,
        api: apiReducer,
        query: queryReducer
    }
});