import "./App.css";
import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    //This function will load use data even the page is reopen with expire time of token (auto login)
    store.dispatch(
      loadUser()
    ); /*if we want to dispatch an action without using connect() the we use
  store.dispatch(nameOfActionToDispatch())*/
  }, []); /* If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument */
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                  {/*  this will act as children for PrivateRoute */}
                </PrivateRoute>
              }
            />
          </Routes>
          <section className="container">
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
