import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
  token: null
};

export const authInputSlice = createSlice({
  name: 'authInput',
  initialState,
  reducers: {
    inputUsername: (state, action) => {
      state.username = action.payload;
    },
    inputPassword: (state, action) => {
      state.password = action.payload;
    },
    loggingin: (state) => {
      state.token = 'good'
    },
    loggingout: (state, action) => {
      state.token = null;
    }
  },
});

export const { inputUsername, inputPassword, loggingin, loggingout } = authInputSlice.actions;

export default authInputSlice.reducer;