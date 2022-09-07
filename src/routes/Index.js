import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from '../pages/Home';
import Error from '../pages/Error';
import Achievements from "../features/achievements/Achievements";
import Profile from "../features/profile/Profile";
import Categories from "../features/quiz/Categories";
import QuizPrepare from "../features/quiz/QuizPrepare";
import Quiz from "../features/quiz/Quiz";
const Index=()=>{
    return(
        <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Error/>}/>
                    <Route path="achievements" element={<Achievements/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="quiz-prepare" element={<QuizPrepare/>}/>
                    <Route path="quiz" element={<Quiz/>}/>
                </Routes>
            
        </BrowserRouter>
    )
}
export default Index;