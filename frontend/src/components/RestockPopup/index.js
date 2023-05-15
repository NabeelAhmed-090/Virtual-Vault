import axios from "axios";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import Loader from "../Loader";

function RestockPopup({
  showPopup,
  setShowPopup,
  title,
  price,
  isGameNew,
  imagePath,
  _id,
  units,
}) {
  const [newPrice, setNewPrice] = useState(price);
  const [newIsGameNew, setNewIsGameNew] = useState(isGameNew);
  const [newUnits, setNewUnits] = useState(units);

  const [loading, setLoading] = useState(false);

  const handleGameUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/games/update/${_id}`, {
        id: _id,
        units: newUnits,
        price: newPrice,
        isGameNew: newIsGameNew,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitsChange = (e) => {
    const enteredValue = e.target.value;
    const parsedValue = parseInt(enteredValue, 10);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setNewUnits(parsedValue);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Restock Game</Modal.Title>
        </Modal.Header>
        <>
          {loading ? (
            <div>
              <Loader message="Updating Game..." />
            </div>
          ) : (
            <>
              <Modal.Body>
                <Card className="mt-1 mb-5 p-2 main-card-height-style">
                  <div className="card-image-height-style">
                    <Card.Img
                      variant="top"
                      src={imagePath}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Container>
                        <Row>
                          <Col md={8} lg={8} sm={12}>
                            <h6>
                              <Card.Title>
                                <b>{title}</b>
                              </Card.Title>
                            </h6>
                          </Col>
                          <Col
                            md={4}
                            lg={4}
                            sm={12}
                            className="d-flex justify-content-end align-content-center"
                          >
                            <Form>
                              <FormControl
                                type="text"
                                placeholder="Enter text"
                                value={newUnits}
                                onChange={handleUnitsChange}
                                className="w-100"
                              />
                            </Form>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} lg={6} sm={12} className="mt-3">
                            {newIsGameNew ? (
                              <Badge
                                bg="success badge-media-style py-2"
                                className="cursor"
                                onClick={() => setNewIsGameNew(false)}
                              >
                                New
                              </Badge>
                            ) : (
                              <Badge
                                bg="warning badge-media-style py-2"
                                className="cursor"
                                onClick={() => setNewIsGameNew(true)}
                              >
                                Used
                              </Badge>
                            )}
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            sm={12}
                            className="price-style mt-3"
                          >
                            <Form>
                              <FormControl
                                type="text"
                                placeholder="Enter text"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="w-100"
                              />
                            </Form>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                    <Row className="mt-auto d-flex">
                      <Col md={12} sm={12} lg={12}>
                        <Button
                          variant="success"
                          className="w-100 button-style-game-card"
                          onClick={handleGameUpdate}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleClosePopup}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </>
      </Modal>
    </>
  );
}

export default RestockPopup;
