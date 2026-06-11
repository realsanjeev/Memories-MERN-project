import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: 'auth/setAuthData', payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: 'auth/setAuthData', payload: data });
    navigate('/');
  } catch (error) {
    alert(`Error: ${error?.response?.data?.message}`);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: JSON.parse(localStorage.getItem('profile')) || null,
  },
  reducers: {
    setAuthData: (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.authData = null;
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
