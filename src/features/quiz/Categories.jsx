import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesSlice";
import { Link } from "react-router-dom";
export const Categories = () => {
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
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
                                        <h4 className="card-title"><Link to="/">Home</Link><span className="disabled-link">/Categories</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {categories.loading &&
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
                    {!categories.loading && categories.error ? (
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
                    {!categories.loading && categories.categories.length ? (
                        <div className="card-body">
                            <div className="row">
                                {
                                    categories.categories.map(categories => (
                                        <div className="col-md-4" key={categories.id}>
                                            <div className="card border-primary mb-3">
                                                <div className="card-body">
                                                    <h4 className="card-title"><i className={categories.icon}></i> <Link to="/quiz-prepare" state={categories.category}>{categories.category}</Link></h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default Categories;