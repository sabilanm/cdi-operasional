// store/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../api/auth";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await postLogin(payload);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        isLoggedIn: false,
    },
    reducers: {},
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

export const authReducer = authSlice.reducer;
