import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { emptyCart } from '../../actions/cartActions';

const PurchaseSuccessful = () => {
  const history = useNavigate();

  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get('session_id');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateGamesStatus = async () => {
      await axios.put(`http://localhost:5000/api/games/update-games-status/${session_id}`, {
        user: userInfo._id
      });
      setLoading(false);
    };
    if (session_id) {
      updateGamesStatus();
      const newLocation = { ...location };
      delete newLocation.search;
      history(newLocation);
      dispatch(emptyCart());
    }
  }, [session_id]);

  return (
    <Container
      style={{ height: '80vh' }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="text-center">
            <h1>Thank you for your purchase</h1>
          </Row>
          <Row className="d-flex justify-content-center w-100">
            <Col md={6} sm={12} lg={6}>
              <Button variant="dark" className="w-100" href={'/search'}>
                Continue Shopping
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PurchaseSuccessful;
