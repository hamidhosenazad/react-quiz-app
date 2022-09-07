import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "./quizSlice";
import xtype from 'xtypejs';
import useCountdown from "./useCountdown";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
    const navigate = useNavigate();
    const [add_achievement, setAddAchievement] = useState(true);
    const [show_details, setShowDetails] = useState(false);
    const [quiz_score, setQuizScore] = useState();
    const [show_result, setShowResult] = useState(false);
    const [result_array, setResultArray] = useState([]);
    const endTime = new Date().getTime() + 6000 * 2;
    const [timeLeft, setEndTime] = useCountdown(endTime);
    const seconds = Math.floor(timeLeft / 1000) % 60;
    const [user_answer, setUserAnswer] = useState('');
    const [user_answers, setUserAnswers] = useState([]);
    const [input_type, setInputType] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [active_slide_item, setActiveSlideItem] = useState(0);
    const quizPrepare = useSelector(state => state.quizPrepare);
    const dispatch = useDispatch();
    const quiz = useSelector(state => state.quiz);
    var questionItemCounter = 0;
    useEffect(() => {
        if (quizPrepare.categoryName == '') {
            navigate("/categories", { replace: true });
        }
        dispatch(fetchQuiz(quizPrepare))
    }, [])
    useEffect(() => {
        if (result_array.length == 10) {
            let y = 0;
            for (let x in result_array) {
                if (result_array[x][5] == true) {
                    y = y + 1;
                }
            }
            setQuizScore(y);
            setShowResult(true);
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            let categoryName = quizPrepare.categoryName;
            let difficultyLevel = quizPrepare.difficultyLevel;
            let result;
            if (y < 5) {
                result = 'failed';
            }
            else {
                result = 'Passed'
            }
            const achievement = { y,dateTime, categoryName, difficultyLevel, result };
            if (add_achievement) {
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/achievments',
                    data: JSON.stringify(achievement),
                    headers: { "Content-Type": "application/json" }
                }).then(() => {
                    setAddAchievement(false);
                });
            }
        }
    }, [result_array])
    useEffect(() => {
        if (seconds === 0) {
            if (result_array.length <= 9) {
                let single_answer = 'answer_a_correct';
                let multiple_answers = [];
                if (quiz.quiz[active_slide_item].multiple_correct_answers == 'false') {
                    Object.entries(quiz.quiz[active_slide_item].correct_answers).map(([key, value]) => (
                        value === 'true' ? single_answer = key : null
                    ))
                    let array_item = [quiz.quiz[active_slide_item].id, quiz.quiz[active_slide_item].question, quiz.quiz[active_slide_item].answers, single_answer, 'none', false, "radio"];
                    result_array.splice(active_slide_item, 0, array_item);
                    setResultArray([...result_array]);
                } else {
                    Object.entries(quiz.quiz[active_slide_item].correct_answers).map(([key, value]) => (
                        value === 'true' ? multiple_answers.splice(active_slide_item, 0, key) : null
                    ))
                    let array_item = [quiz.quiz[active_slide_item].id, quiz.quiz[active_slide_item].question, quiz.quiz[active_slide_item].answers, multiple_answers, ["none"], false, "checkbox"];
                    result_array.splice(active_slide_item, 0, array_item);
                    setResultArray([...result_array]);
                }
                setEndTime(endTime);
                setActiveSlideItem(active_slide_item + 1);
                setUserAnswers([]);
                setInputType('');
            }
        }
    }, [seconds])
    const userSelectedInput = (event, question_id, question, answers, correct_answers) => {

        event.preventDefault();
        if (input_type == "radio" && user_answer != '') {
            let selected_single_answer = '';
            let selected_single_answer_result = '';
            Object.entries(correct_answers).map(([key, value]) => (
                value === 'true' ? selected_single_answer = key : null
            ))
            if (user_answer == selected_single_answer) {
                selected_single_answer_result = true;
            } else {
                selected_single_answer_result = false;
            }
            let array_item = [question_id, question, answers, selected_single_answer, user_answer, selected_single_answer_result, "radio"];
            result_array.splice(active_slide_item, 0, array_item);
            setResultArray([...result_array]);
            setShowAlert(false);
            setUserAnswer('');
            setInputType('');
            setActiveSlideItem(active_slide_item + 1);
            setEndTime(endTime);
        }
        else if (input_type == "checkbox" && user_answers.length > 0) {
            let selected_multiple_answer = [];
            let selected_multiple_answer_result = '';
            Object.entries(quiz.quiz[active_slide_item].correct_answers).map(([key, value]) => (
                value === 'true' ? selected_multiple_answer.splice(active_slide_item, 0, key.substring(0, 8)) : null
            ))
            selected_multiple_answer_result =
                selected_multiple_answer.length === user_answers.length &&
                selected_multiple_answer.every(function (element) {
                    return user_answers.includes(element);
                });
            let array_item = [question_id, question, answers, selected_multiple_answer, user_answers, selected_multiple_answer_result, "checkbox"];
            result_array.splice(active_slide_item, 0, array_item);
            setResultArray([...result_array]);
            setUserAnswers([]);
            setInputType('');
            setShowAlert(false);
            setActiveSlideItem(active_slide_item + 1);
            setEndTime(endTime);
        }
        else {
            setShowAlert(true);
        }

        // dispatch(userInput({questionId,question,right_answer,user_answer,asnwer_result,answer_score}));
    }
    const handleCheckboxChange = (event) => {
        if (user_answers.length > 0) {
            if (user_answers.includes(event.target.value)) {
                let item_index = user_answers.indexOf(event.target.value);
                user_answers.splice(item_index, 1);
                setUserAnswers([...user_answers]);
            } else {
                setUserAnswers([...user_answers, event.target.value]);
            }
        } else {
            setUserAnswers([...user_answers, event.target.value]);
        }
    }
    const handleDetailsClick = () => {
        setShowDetails(true);
    }
    return (
        <div className="row pt-5">
            {show_alert &&
                <div className="alert alert-danger fade-in">
                    <strong>Oh snap!</strong> <a href="#" className="alert-link">You must select an option</a>.Try submitting again.
                </div>
            }
            <div className="col-md-12">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-body">
                                        <h4 className="card-title"><Link to="/">Home</Link><Link to="/categories" className="secondary-link">/Categories</Link><span className="disabled-link">/Quiz</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {quiz.loading ? (
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border-primary mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title">Loading...</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {!quiz.loading && quiz.error ? (
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border-primary mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title">Unknown Error Occured</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {!quiz.loading && quiz.quiz.length ? (
                        <div className="card-body">
                            <div className="row">
                                {
                                    quiz.quiz.map(quiz => (
                                        <div className={`col-md-12 fade-in ${questionItemCounter == active_slide_item ? 'slide-item-active' : 'slide-item-inactive'}`} key={questionItemCounter}>
                                            <form onSubmit={(event) => {
                                                {
                                                    userSelectedInput(
                                                        event, quiz.id, quiz.question, quiz.answers, quiz.correct_answers
                                                    )
                                                }
                                            }}>
                                                <div className="card border-primary mb-3">
                                                    <div className="card-body">
                                                        <h4 className="card-title">{quiz.question}</h4>
                                                        {quiz.description &&
                                                            <p className="card-text">{quiz.description}</p>
                                                        }
                                                        {quiz.multiple_correct_answers == "true" && Object.entries(quiz.answers).map(([key, value]) => (
                                                            value && <div className="form-check" key={key}>
                                                                <input className="form-check-input"
                                                                    type="checkbox"
                                                                    name={key}
                                                                    id={key}
                                                                    value={key}
                                                                    // onChange={(event) => { setUserAnswers([...user_answers, event.target.value]);setInputType(event.target.type) }}
                                                                    onChange={(event) => { handleCheckboxChange(event); setInputType(event.target.type) }}
                                                                />
                                                                <label className="form-check-label" htmlFor={value}>
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                        {quiz.multiple_correct_answers == "false" && Object.entries(quiz.answers).map(([key, value]) => (
                                                            value && <div className="form-check" key={key}>
                                                                <input className="form-check-input"
                                                                    type="radio"
                                                                    name={quiz.id}
                                                                    id={value}
                                                                    value={key}
                                                                    onChange={(event) => { setUserAnswer(event.target.value + '_correct'); setInputType(event.target.type) }}
                                                                />
                                                                <label className="form-check-label" htmlFor={value}>
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                        {quiz.multiple_correct_answers == 'true' &&
                                                            <p><span className="color-warning">Note</span>: You can select multiple answers</p>
                                                        }
                                                        <p><button type="submit" className="btn btn-success">Next</button></p>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="col-md-2">
                                                </div>
                                                <div className="col-md-5">
                                                    <p>Quiz no. <span className="color-danger">{questionItemCounter++}</span>/9</p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p>{`00:00:${seconds}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : null}
                    {show_result && result_array.length == 10 ? (
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border-primary mb-3">
                                        {quiz_score < 5 ? (
                                            <div className="card-body score-card">
                                                <h1 className="card-title"><i className="fa-solid fa-star failed-star"></i></h1>
                                                <h2 className="card-title color-danger">Unfortunately</h2>
                                                <h4 className="card-text">You failed</h4>
                                                <h4 className="card-text">You scored <span className="color-danger"> {quiz_score}</span> out of 10</h4>
                                            </div>
                                        ) : null}
                                        {quiz_score > 4 && quiz_score < 7 ? (
                                            <div className="card-body score-card">
                                                <h1 className="card-title"><i className="fa-solid fa-star"></i></h1>
                                                <h2 className="card-title color-danger">Congratulation!</h2>
                                                <h4 className="card-text">You passed the test </h4>
                                                <h4 className="card-text">You scored <span className="color-danger">{quiz_score}</span> out of 10</h4>
                                            </div>
                                        ) : null}
                                        {quiz_score > 6 && quiz_score < 9 ? (
                                            <div className="card-body score-card">
                                                <h1 className="card-title"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></h1>
                                                <h2 className="card-title color-danger">Congratulation!</h2>
                                                <h4 className="card-text">You did well </h4>
                                                <h4 className="card-text">You scored <span className="color-danger">{quiz_score}</span> out of 10</h4>
                                            </div>
                                        ) : null}
                                        {quiz_score > 8 && quiz_score < 11 ? (
                                            <div className="card-body score-card">
                                                <h1 className="card-title"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></h1>
                                                <h2 className="card-title color-danger">Congratulation!</h2>
                                                <h4 className="card-text">You did great </h4>
                                                <h4 className="card-text">You scored <span className="color-danger">{quiz_score}</span> out of 10</h4>

                                            </div>
                                        ) : null}
                                        <div className="score-card">
                                            <button className="btn btn-info" onClick={() => handleDetailsClick()}>See details</button>

                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {show_result && result_array.length == 10 && show_details == true && result_array.map(([key, question, answers, correct_answer, user_answer, result, input_type]) => (
                        <div className="card-body" key={key}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border-primary mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title">{question}</h4>
                                            <ul>
                                                {Object.entries(answers).map(([answers_key, answers_value]) => (
                                                    answers_value && input_type == "radio" ?
                                                        <li key={answers_key} className='card-text correct-answer'>
                                                            {
                                                                answers_value
                                                            }
                                                        </li>
                                                        : answers_value &&
                                                        <li key={answers_key} className='card-text'>
                                                            {
                                                                answers_value
                                                            }
                                                        </li>
                                                ))}
                                            </ul>
                                            {
                                                input_type == "radio" ?
                                                    <p><span className="color-warning">Correct  option </span>:  {correct_answer.slice(7, 8)} </p>
                                                    :

                                                    <p>Correct options :
                                                        {correct_answer.map((correct_answer) => (
                                                            <span key={correct_answer}>{correct_answer.slice(7, 8)}, </span>
                                                        ))}
                                                    </p>

                                            }
                                            {
                                                input_type == "radio" ?
                                                    <p><span className="color-warning">You picked </span>:  {user_answer.slice(7, 8)} </p>
                                                    :
                                                    <p>You Picked :
                                                        {user_answer.map((user_answer) => (
                                                            <span key={user_answer}>{user_answer.slice(7, 8)}, </span>
                                                        ))}
                                                    </p>

                                            }
                                            {
                                                result == true ?
                                                    <p className="color-green">Your answer was correct </p>
                                                    :
                                                    <p className="color-danger">Your answer was incorrect</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Quiz;