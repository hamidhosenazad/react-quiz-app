
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="row vertically-center">
            <div className="col-md-6">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <h4 className="card-title"><i className="fas fa-question-circle"></i> <Link to="/categories">Take A quiz</Link></h4>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <h4 className="card-title"><i className="fas fa-award"></i> <Link to="/achievements">View achievements</Link></h4>
                    </div>
                </div>
            </div>
        </div>



    )
}
export default Home;