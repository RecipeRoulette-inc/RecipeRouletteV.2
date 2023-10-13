import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  queryStatus: false,
  queryRecipes: [],
  queryRecipesUnder30State: [],
  queryRecipesGlutenFreeState: [],
  queryRecipesVeganState: [],
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
    },
    populateUnder30: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.queryRecipesUnder30State.push(action.payload[i]);
      }
    },
    clearUnder30: (state) => {
      state.queryRecipesUnder30State = [];
    },
    populateGlutenFree: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.queryRecipesGlutenFreeState.push(action.payload[i]);
      }
    },
    clearGlutenFree: (state) => {
      state.queryRecipesGlutenFreeState = [];
    },
    populateVegan: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.queryRecipesGlutenFreeState.push(action.payload[i]);
      }
    },
    clearGlutenFree: (state) => {
      state.queryRecipesGlutenFreeState = [];
    },
  },
});

export const { 
  populate, 
  clear, 
  queryMade, 
  queryEnded, 
  populateUnder30, 
  clearUnder30, 
  populateGlutenFree, 
  clearGlutenFree
} = queryRecipesSlice.actions;

export default queryRecipesSlice.reducer;