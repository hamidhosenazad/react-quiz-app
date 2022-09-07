import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    categoryName:"",
    difficultyLevel:""
}
const quizPrepareSlice = createSlice({
    name: 'quizPrepare',
    initialState,
    reducers:{
        quizParam: (state,action)=>{
            state.categoryName = action.payload.categoryName;
            state.difficultyLevel = action.payload.difficulty;
        }
    }
})
export default quizPrepareSlice.reducer;
export const {quizParam} = quizPrepareSlice.actions;