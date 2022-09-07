import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    loading: false,
    achievments: [],
    error: ''
}

//Generated pending,fullfilled and rejected action types
export const fetchAchievments = createAsyncThunk('achievments/fetchAchievments', () => {
    return axios.get('http://localhost:8000/achievments')
        .then((response) => response.data)
});

const achievmentsSlice = createSlice({
    name: 'achievments',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchAchievments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAchievments.fulfilled, (state, action) => {
            state.loading = false;
                state.achievments = action.payload;
                state.error = ''
        })
        builder.addCase(fetchAchievments.rejected, (state, action) => {
            state.loading = false;
                state.achievments = [];
                state.error = action.error.message
        })
    }
})
export default achievmentsSlice.reducer;