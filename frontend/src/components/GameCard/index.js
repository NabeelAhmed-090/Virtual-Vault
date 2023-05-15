import React, { useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import ErrorToaster from '../ErrorToaster'
import RestockPopup from '../RestockPopup'
import './index.css'


const GameCard = ({ title, price, description, isGameNew, imagePath, createdAt, _id, handleGameDeletion, units }) => {
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
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
    const handleRestock = () => {
        setShowPopup(true)
    }
    return (
        <>
            <RestockPopup
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                title={title}
                description={description}
                price={price}
                isGameNew={isGameNew}
                imagePath={imagePath}
                createdAt={createdAt}
                _id={_id}
                units={units}
            />
            <Card className='mt-1 mb-5 p-2 main-card-height-style'>
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
                                    {
                                        units === 0 ? <Badge bg="danger" className='w-100 mt-1 py-2'>OUT OF STOCK</Badge> : <Badge bg="dark" className='w-100 mt-1 py-2'>IN STOCK {units}</Badge>
                                    }

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
                    <Row className="mt-auto d-flex">
                        <Col md={6} sm={6} lg={6}>
                            <Button variant="danger" className='w-100 button-style-game-card' onClick={handleDelete}>Delete</Button>
                        </Col>
                        <Col md={6} sm={6} lg={6}>
                            <Button
                                variant="dark"
                                className='w-100 button-style-game-card'
                                onClick={handleRestock}
                            >
                                Restock
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
                <ErrorToaster display={!!success} error={false} message={'Game Successfully Deleted'} />
                <ErrorToaster display={!!failure} error={true} message={'Something went wrong'} />
            </Card>
        </>
    )
}




export default GameCard