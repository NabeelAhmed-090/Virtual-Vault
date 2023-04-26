import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'

const SearchGameCard = ({ _id, title, price, isGameNew, imagePath }) => {
    let history = useNavigate()
    const handleViewClick = () => {
        history(`/search/game?_id=${_id}`);
    }
    return (
        <Card className='mt-1 mb-5 p-2'>
            <div style={{ width: "100%", height: "60vh" }}>
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
            <Card.Body>
                <Container>
                    <Row>
                        <Col md={12} lg={12} sm={12}>
                            <h6><Card.Title><b>{title}</b></Card.Title></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6} sm={12} className='mt-1'>
                            {isGameNew ? (
                                <Badge bg="success">New</Badge>
                            ) : (
                                <Badge bg="warning">Used</Badge>
                            )}
                        </Col>
                        <Col md={6} lg={6} sm={12} className='price-style mt-1'>
                            <h6><Card.Text><b>{price} PKR</b></Card.Text></h6>
                        </Col>
                    </Row>
                </Container>
                <Button variant="dark" className='w-100 mb-2 button-style-game-card' onClick={handleViewClick}>View</Button>
            </Card.Body>
        </Card>
    )
}

export default SearchGameCard