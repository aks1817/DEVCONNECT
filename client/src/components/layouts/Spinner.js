import React from "react";
import spinner from "./cat_loading.gif";

const Spinner = () => (
  <div style={{ margin: "200px" }} className="hide-sm">
    <img
      src={spinner}
      style={{ width: "400px", margin: "auto", display: "flex" }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;
