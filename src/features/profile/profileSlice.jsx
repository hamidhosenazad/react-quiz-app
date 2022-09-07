import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    loading: false,
    profile: [],
    error: ''
}

//Generated pending,fullfilled and rejected action types
export const fetchProfile = createAsyncThunk('profile/fetchProfile', () => {
    return axios.get('http://localhost:8000/profile')
        .then((response) => response.data)
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
                state.profile = action.payload;
                state.error = ''
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
                state.profile = [];
                state.error = action.error.message
        })
    }
})
export default profileSlice.reducer;