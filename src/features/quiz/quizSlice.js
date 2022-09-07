import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    loading: false,
    quiz: [],
    error: ''
}
//Generated pending,fullfilled and rejected action types
export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', (quizPrepare) => {
    const {categoryName,difficultyLevel} = quizPrepare;
    return axios.get(`https://quizapi.io/api/v1/questions?apiKey=MTpSzD5twrLKDeyaTNspImaKoohXIH9ffBKMITLz&limit=10&tags=${categoryName}&difficulty=${difficultyLevel}`)
        .then((response) => response.data)
});

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchQuiz.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchQuiz.fulfilled, (state, action) => {
            state.loading = false;
                state.quiz = action.payload;
                state.error = ''
        })
        builder.addCase(fetchQuiz.rejected, (state, action) => {
            state.loading = false;
                state.quiz = [];
                state.error = action.error.message
        })
    }
})
export default quizSlice.reducer;