import React, { useState } from 'react'
import axios from 'axios'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import './index.css'
import ErrorToaster from '../ErrorToaster'


const GameCard = ({ title, price, description, isNew, imagePath, createdAt, _id, handleGameDeletion }) => {
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const handleDelete = async () => {
        setSuccess(false)
        setFailure(false)
        const response = await handleGameDeletion(_id)
        if (response) {
            setSuccess(true)
        } else {
            setFailure(true)
        }
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
                            {isNew ? (
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
                <Button variant="danger" className='w-100 mb-2 button-style-game-card' onClick={handleDelete}>Delete</Button>
            </Card.Body>
            <ErrorToaster display={!!success} error={false} message={'Game Succesfully Deleted'} />
            <ErrorToaster display={!!failure} error={true} message={'Something went wrong'} />
        </Card>
    )
}

export default GameCard