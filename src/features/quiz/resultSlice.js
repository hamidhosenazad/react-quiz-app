import { createSlice } from '@reduxjs/toolkit';
const initialState = [
    { inputId: 0, question_id: '',question: '', right_answer: [],user_answers: [],asnwer_result:'',answer_score:'' }
]
const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        userInput: (state, action) => {
            state.categoryName = action.payload.categoryName;
            state.difficultyLevel = action.payload.difficulty;
        }
    }
})
export default resultSlice.reducer;
export const { userInput } = resultSlice.actions;