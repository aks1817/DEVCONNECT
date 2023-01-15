import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({ profile, getCurrentProfile, auth }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  console.log(profile, auth);
  return <div className="container">Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  auth: state.auth.user,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
