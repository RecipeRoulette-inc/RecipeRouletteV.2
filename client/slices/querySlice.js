import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentInput: '',
  queryTotal: 0,
  queryResults: []
};

// all actions are generalized in terms of the payload, will have to refactor based on how the API presents the information
export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    currentInput: (state, action) => {
      state.currentInput = action.payload;
    },
    populate: (state, action) => {
      state.queryTotal += action.payload.length;
      state.queryResults.push(action.payload);
    }
  },
});

export const { currentInput, populate } = querySlice.actions;

export default querySlice.reducer;