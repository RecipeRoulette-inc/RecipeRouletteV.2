import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
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
  },
});

export const { inputUsername, inputPassword, login, logout } = authInputSlice.actions;

export default authInputSlice.reducer;