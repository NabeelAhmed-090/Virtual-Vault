import React from "react";
import { Spinner } from "react-bootstrap";
import "./index.css";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-div d-flex flex-column align-items-center">
      <Spinner animation="border" role="status" className="loader" />
      <h5 className="mt-3">{message}</h5>
    </div>
  );
};

export default Loader;
