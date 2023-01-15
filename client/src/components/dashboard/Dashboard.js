import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({ profile, getCurrentProfile, auth, loading }) => {
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
          <Fragment>has</Fragment>
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
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  auth: state.auth.user,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
