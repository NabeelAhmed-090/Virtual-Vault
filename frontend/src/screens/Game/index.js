import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';

const Game = () => {
  let { id } = useParams();

  let history = useNavigate();

  const [game, setGame] = useState({});
  const [seller, setSeller] = useState({});
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      const { data } = await axios.get(`/api/games/${id}`);
      setGame(data.game);
      setSeller(data.seller);
      setTags(data.game.tags[0].split(','));
      setLoading(false);
    };
    fetchGame();
    return () => {
      setGame([]);
    };
  }, [id]);

  const handleOnClick = () => {
    history(`/cart/${id}?qty=${units}`);
  };

  return (
    <>
      {loading ? (
        <div style={{ height: '60vh' }}>
          <Loader message="Fetching Game..." />
        </div>
      ) : (
        <Container>
          <Row className="mt-5">
            <Col md={6} sm={12} lg={6}>
              <img
                src={game.imagePath}
                alt={game.title}
                style={{ width: '100%', height: '100%' }}
              />
            </Col>
            <Col md={6} sm={12} lg={6}>
              <Row>
                <h1>Seller Info</h1>
              </Row>
              <Row className="mt-3">
                <Col md={6} sm={12} lg={6}>
                  <h5>{seller.userName}</h5>
                </Col>
                <Col md={6} sm={12} lg={6} className="d-flex justify-content-end">
                  <h5>{seller.city}</h5>
                </Col>
              </Row>
              <hr />
              <Row className="mt-5">
                <h1>Game Info</h1>
              </Row>
              <Row className="mt-3">
                <Col md={6} sm={12} lg={6}>
                  <h5>{game.title}</h5>
                </Col>
                <Col md={6} sm={12} lg={6} className="d-flex justify-content-end">
                  <h5>{game.price}</h5>
                </Col>
              </Row>
              <Row className="mt-3">
                {tags.map((tag) => {
                  return (
                    <Col key={tag} style={{ display: 'flex', justifyContent: 'center' }}>
                      <div
                        style={{
                          height: '50px',
                          width: '100px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                        className="mt-2"
                        key={`selected ${tag}`}
                      >
                        <p style={{ fontSize: '10px' }} className="mt-3">
                          {tag}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <hr />
              <Row>
                <Row>
                  <Col md={6} sm={6} lg={6}>
                    Units
                  </Col>
                  <Col md={6} sm={6} lg={6}>
                    <Form.Control
                      as="select"
                      className="w-100"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                    >
                      {[...Array(game.units).keys(), game.units].map((x) => {
                        return (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Row>
              </Row>
              <Row>
                <Button
                  variant="dark"
                  className="mt-5"
                  disabled={units === 0 ? true : false}
                  onClick={handleOnClick}
                >
                  Add to Cart
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Game;
