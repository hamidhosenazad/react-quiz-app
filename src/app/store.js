import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import achievmentsReducer from "../features/achievements/achievmentsSlice";
import categoriesReducer from "../features/quiz/categoriesSlice";
import quizPrepareReducer from "../features/quiz/quizPrepareSlice";
import quizReducer from "../features/quiz/quizSlice";
import resultReducer from "../features/quiz/resultSlice"
const store = configureStore({
    reducer:{
        profile:profileReducer,
        achievments: achievmentsReducer,
        categories: categoriesReducer,
        quizPrepare: quizPrepareReducer,
        quiz: quizReducer,
        result: resultReducer
    }
})

export default store;