import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  profile,
  getCurrentProfile,
  auth,
  loading,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {auth && auth.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  auth: state.auth.user,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
