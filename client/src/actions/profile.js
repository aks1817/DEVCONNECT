import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

//get current user profile
const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update profile
const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    /*It lets you access the history instance used by React Router. Using the history instance you can redirect users to another page. The history instance created by React Router uses a Stack( called “History Stack” ), that stores all the entries the user has visited*/

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      if (!edit) {
        navigate(
          "/dashboard"
        ); /*we cannot use redirect method in action so we need to use history.push*/
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.map((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
export { getCurrentProfile, createProfile };
