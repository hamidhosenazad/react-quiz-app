import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAchievments } from "./achievmentsSlice";
import { Link } from "react-router-dom";
export const Achievments = () => {

    const achievments = useSelector(state => state.achievments);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAchievments())
    }, [])
    return (
        <div className="row pt-5">
            <div className="col-md-12">
                <div className="card border-primary mb-3">
                <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-body">
                                        <h4 className="card-title"><Link to="/">Home</Link><span className="disabled-link">/Achievments</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {achievments.loading &&
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
                    }
                    {!achievments.loading && achievments.error ? (
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
                    {!achievments.loading && achievments.achievments.length >= 1 ? (
                        <div className="card-body">
                            <div className="row">
                                {
                                    achievments.achievments.map(achievment => (
                                        <div className="col-md-3" key={achievment.id}>
                                            <div className="card border-primary mb-3">
                                                <div className="card-body">
                                                    <h4 className="card-title"><i className="fas fa-question-circle"></i> Category: {achievment['categoryName']}</h4>
                                                    <p className="card-text"><i className="fa-solid fa-gauge-high"></i> Difficulty Level: {achievment.difficultyLevel}</p>
                                                    <p className="card-text"><i className="fa-solid fa-check"></i> Score: {achievment.y}</p>
                                                    <p className="card-text"><i className="fa fa-list-alt" aria-hidden="true"></i> Result: {achievment.result}</p>
                                                    <p className="card-text"><i className="fa fa-calendar" aria-hidden="true"></i> Date: {(achievment.dateTime)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : null}
                    {!achievments.loading && achievments.achievments.length == 0 ? (
                        <div className="card-body">
                            <div className="row">
                                {
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card border-primary mb-3">
                                                    <div className="card-body">
                                                        <h4 className="card-title">No achievements yet</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default Achievments;