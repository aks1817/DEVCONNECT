import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    /* LocalStorage is a web storage object to store the data on the user’s computer locally, which means the stored data is saved across browser sessions and the data stored has no expiration time.*/
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.map((error) => dispatch(setAlert(error.msg, "danger"))); // we need to dispatch action from other actions
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User
const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.map((error) => dispatch(setAlert(error.msg, "danger"))); // we need to dispatch action from other actions
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({
    type: LOGOUT,
  });
};

export { register, loadUser, login, logout };
