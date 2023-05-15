import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import Map from "../Maps";

/* eslint-disable react/prop-types */

function Popup({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="other-boxes">
        <Modal.Title>Google Maps</Modal.Title>
      </Modal.Header>
      <Modal.Body className="boxes">
        <Map />
      </Modal.Body>
      <Modal.Footer className="other-boxes">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
