import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userId: null,
		user: null,
		isLoggedIn: false,
	},
	reducers: {
		setCredientials: (state, { payload: { user, userId, isLoggedIn } }) => {
			state.user = user;
			state.userId = userId;
			state.isLoggedIn = isLoggedIn;
		},
		deleteCredientials: (state) => {
			state.user = null;
			state.userId = null;
			state.isLoggedIn = false;
		},
	},
});

export const { setCredientials, deleteCredientials } = authSlice.actions;

export default authSlice.reducer;
