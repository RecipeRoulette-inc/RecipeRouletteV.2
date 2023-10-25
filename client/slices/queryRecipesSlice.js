import { createSlice, current } from '@reduxjs/toolkit'

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
      console.log('From populateMain');
      console.log('From populateMain action: ', action);
      // state.queryRecipes.push(action.payload);
      state.queryRecipes = action.payload;
      console.log('From AFTER populateMain action QUERY RECIPES: ', state.queryRecipes);
      
    },
    clearMain: (state) => {
      state.queryRecipes = [];
      state.queryStatus = false;
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
        state.queryRecipesVeganState.push(action.payload[i]);
      }
    },
    clearVegan: (state) => {
      state.queryRecipesVeganState = [];
    },
  },
});

export const { 
  populateMain, 
  clearMain, 
  queryMade, 
  queryEnded, 
  populateUnder30, 
  clearUnder30, 
  populateGlutenFree, 
  clearGlutenFree,
  populateVegan, 
  clearVegan
} = queryRecipesSlice.actions;

export default queryRecipesSlice.reducer;