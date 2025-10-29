// src/store/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../features/auth/services/authService";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await authService.login(credentials);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
