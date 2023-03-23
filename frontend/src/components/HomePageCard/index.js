import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './index.css'

function HomePageCard({ title, owner, img }) {
    return (
        <Card className='card mt-5'>
            <div className='card-img-div'>
                <Card.Img className="card-img" variant="top" src={img} />
            </div>
            <Card.Body className='card-body'>
                <Container className="card-body-container">
                    <Row>
                        <Col className="title-text" md={6} lg={6} sm={12}>
                            <Card.Title><b><h6>{title}</h6></b></Card.Title>
                        </Col>
                        <Col className="owner-text" md={6} lg={6} sm={12}>
                            <Card.Text>
                                <b><h6>{owner}</h6></b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Container>
                <Button variant="dark" className='w-100 mt-4'>Check it out</Button>
            </Card.Body>
        </Card>
    );
}

export default HomePageCard;