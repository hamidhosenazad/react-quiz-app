import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    loading: false,
    categories: [],
    error: ''
}

//Generated pending,fullfilled and rejected action types
export const fetchCategories = createAsyncThunk('categories/fetchCategories', () => {
    return axios.get('http://localhost:8000/categories')
        .then((response) => response.data)
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
                state.categories = action.payload;
                state.error = ''
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
                state.categories = [];
                state.error = action.error.message
        })
    }
})
export default categoriesSlice.reducer;