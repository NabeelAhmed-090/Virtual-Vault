import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddressMap = ({ address, setAddress }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [center, setCenter] = useState({
    lat: 31.481630977050962,
    lng: 74.30299263917533,
  });

  const handleLocationChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = () => {
    const [lat, lng] = address.split(",").map(parseFloat);
    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter({ lat, lng });
    }
  };

  useEffect(() => {
    if (address) {
      const [lat, lng] = address.split(",").map(parseFloat);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCenter({ lat, lng });
      }
    }
  }, [address]);

  return (
    <div className="map mb-5">
      <div className="search-container">
        <Row className="text-center mt-1 mb-3">
          <Col md={8} sm={12} lg={8}>
            <Form.Group as={Col} md="12">
              <Form.Control
                className={"shadow-none"}
                required
                type="text"
                value={address}
                onChange={handleLocationChange}
                placeholder="Enter location (lat, lng)"
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12} lg={4}>
            <Button variant="dark" className="w-100" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </div>

      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default AddressMap;
