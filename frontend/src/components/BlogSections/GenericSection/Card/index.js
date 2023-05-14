import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './index.css'

const GenericCard = ({ id, title, blog, user, imagePath }) => {

    let history = useNavigate()

    const handleOnClick = () => {
        history(`/blogs/${id}`)
    }

    const shortenedBlog = blog.slice(0, 100) + ".......";

    return (
        <Card className='mt-3 main-card-blog'>
            <Container>
                <Card.Header className='text-center header-card-blog'><b>{title}</b></Card.Header>
                <Row>
                    <Col className='img-col-blog-col'>
                        <img src={imagePath} alt="Blog 1" className='img-fluid img-card-blog' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Body className='d-flex flex-column justify-content-between card-body-blog'>
                            <div>
                                <Card.Text className='card-text-blog'>
                                    {shortenedBlog}
                                </Card.Text>
                            </div>
                            <div className="mt-auto">
                                <Button variant="dark" className="w-100 mb-5" onClick={() => handleOnClick()}>Read</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default GenericCard