import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { quizParam } from "./quizPrepareSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const QuizPrepare = () => {
    const navigate = useNavigate();
    const quizParameter = () => {
        dispatch(quizParam({ categoryName, difficulty }));
        navigate("/quiz", { replace: true });
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const categoryName = location.state;
    useEffect(() => {
        if(categoryName==null){
            navigate("/categories", { replace: true });
        }
    }, [])
    
    const [difficulty, setDifficulty] = useState("Easy");
    return (
        <div className="row pt-5">
            <div className="col-md-12">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-body">
                                        <h4 className="card-title"><Link to="/">Home</Link><Link to="/categories" className="secondary-link">/Categories</Link><span className="disabled-link">/Quiz difficulty</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-body">
                                        <h4 className="card-title">Category Name: {categoryName}</h4>
                                        <div className="form-group">
                                            <label htmlFor="exampleSelect1" className="form-label mt-4">Difficulty Level</label>
                                            <select className="form-select" value={difficulty} onChange={(event) => { setDifficulty(event.target.value) }}>
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                        </div>
                                        <br />
                                        <button type="button" className="btn btn-success"
                                            onClick={() => { quizParameter() }}
                                        >Start</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizPrepare;