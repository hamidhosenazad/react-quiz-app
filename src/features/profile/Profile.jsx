import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./profileSlice";
export const Profile = () => {

    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProfile())
    }, [])
    return (
        <div className="row pt-5">
            <div className="col-md-12">
                <div className="card border-primary mb-3">
                {profile.loading &&
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
                    {!profile.loading && profile.error ? (
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
                    {!profile.loading && profile.profile.length ? (
                        <div className="card-body">
                            {
                                profile.profile.map(profile => (
                                    <div className="row" key={profile.id}>
                                        <div className="col-md-12">
                                            <div className="card border-primary mb-3">
                                                <div className="card-body">
                                                    <h4 className="card-title">First Name: {profile.first_name}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card border-primary mb-3">
                                                <div className="card-body">
                                                    <h4 className="card-title">Last Name: {profile.last_name}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card border-primary mb-3">
                                                <div className="card-body">
                                                    <h4 className="card-title">Username: {profile.username}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default Profile;