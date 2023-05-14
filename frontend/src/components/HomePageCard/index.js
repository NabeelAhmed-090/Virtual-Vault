import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './index.css'

function HomePageCard({ game }) {
    let history = useNavigate()
    const handleOnClick = () => {
        history(`/search/game/${game._id}`)
    }
    return (
        <Card className='card mt-5 p-2'>
            <div className='card-img-div'>
                <Card.Img className="card-img" variant="top" src={game.imagePath} />
            </div>
            <Card.Body className='card-body d-flex flex-column'>
                <Container className="card-body-container">
                    <Row>
                        <Col className="title-text" md={6} lg={6} sm={12}>
                            <h6><Card.Title><b>{game.title}</b></Card.Title></h6>
                        </Col>
                        <Col className="owner-text" md={6} lg={6} sm={12}>
                            <h6>
                                <Card.Text>
                                    <b>{game.price}</b>
                                </Card.Text>
                            </h6>
                        </Col>
                    </Row>
                </Container>
                <div className="mt-auto">
                    <Button variant="dark" className='w-100' onClick={handleOnClick}>Check it out</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default HomePageCard;