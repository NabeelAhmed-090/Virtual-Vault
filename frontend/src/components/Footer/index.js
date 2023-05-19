import React, { useState } from 'react';
import { Col, Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import Popup from '../Modal';
import './index.css';

const Footer = () => {
  const [show, setShow] = useState(false);

  const toEmail = 'l190916@lhr.nu.edu.pk';

  const openGmailCompose = () => {
    window.open(
      `https://mail.google.com/mail/u/0/#inbox?compose=new&to=${toEmail}&view=cm`,
      '_blank'
    );
  };
  const tooltip = (message) => <Tooltip>{message}</Tooltip>;

  return (
    <>
      {show === true && <Popup show={show} handleClose={() => setShow(false)} />}

      <div className="footer-div mt-3">
        <Container>
          <Row>
            <Col>
              <h1 className="pt-3" style={{ textAlign: 'center' }}>
                Virtual Vault
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12} lg={6}>
              <h4 className="pt-3" style={{ textAlign: 'center' }}>
                About Us
              </h4>
              <div style={{ textAlign: 'justify' }}>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. In praesentium
                  voluptatem autem sed esse, consequatur assumenda nostrum animi quidem deserunt hic
                  asperiores incidunt, facere rem doloribus quasi tempora voluptates, officia natus
                  dolorem tempore? Placeat quod id delectus tenetur ad, magnam impedit, nisi eos
                  illo in facere corporis voluptates quas ab odit iusto officiis aut pariatur. Totam
                  magni iste corporis voluptates.
                </p>
              </div>
            </Col>
          </Row>
          <Row style={{ borderTop: '1px solid white' }}>
            <Col md={9} sm={12} lg={9} className="mt-4 copyright">
              <h5>Copyright @VirtualVault</h5>
            </Col>
            <Col md={3} sm={12} lg={3} className="mt-4 icons-col-section">
              <OverlayTrigger placement="top" overlay={tooltip('0331-4250817')}>
                <p>
                  <FontAwesomeIcon icon={faPhone} />
                </p>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={tooltip('nabeelahmedamir@gmail.com')}>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} onClick={openGmailCompose} />
                </p>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={tooltip('nabeel-ahmed-amir')}>
                <p>
                  <FontAwesomeIcon icon={faLinkedin} />
                </p>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={tooltip('Click me')}>
                <p className="cursor" onClick={() => setShow(true)}>
                  <FontAwesomeIcon icon={faMapPin} />
                </p>
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Footer;
