import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
