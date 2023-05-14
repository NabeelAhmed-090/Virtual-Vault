import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import './index.css'

const SearchGameCard = ({ _id, title, price, isGameNew, imagePath, units }) => {
    let history = useNavigate()
    const handleViewClick = () => {
        history(`/search/game/${_id}`)
    }
    return (
        <Card className='mt-1 mb-5 p-3 main-card-height-style'>
            <div className='card-image-height-style'>
                <Card.Img
                    variant="top"
                    src={imagePath}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center"
                    }}
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Container>
                        <Row>
                            <Col md={8} lg={8} sm={12}>
                                <h6><Card.Title><b>{title}</b></Card.Title></h6>
                            </Col>
                            <Col md={4} lg={4} sm={12} className='d-flex justify-content-end align-content-center'>
                                <Badge bg="dark" className='w-100 mt-1 py-2'>IN STOCK {units}</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} lg={6} sm={12} className='mt-3'>
                                {isGameNew ? (
                                    <Badge bg="success badge-media-style py-2">New</Badge>
                                ) : (
                                    <Badge bg="warning badge-media-style py-2">Used</Badge>
                                )}
                            </Col>
                            <Col md={6} lg={6} sm={12} className='price-style mt-3'>
                                <h6><Card.Text><b>{price} PKR</b></Card.Text></h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Button variant="dark" className='w-100 mb-2 mt-3 button-style-game-card' onClick={handleViewClick}>View</Button>
                </div>
            </Card.Body>
        </Card>

    )
}

export default SearchGameCard