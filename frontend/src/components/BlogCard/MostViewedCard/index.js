import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './index.css'

const MostViewedCard = ({ title, blog, user, imagePath }) => {
    const shortenedBlog = blog.slice(0, 100) + ".......";
    return (
        <Card className='mt-3 main-card-blog '>
            <Container>
                <Card.Header className='text-center header-card-blog'><b>{title}</b></Card.Header>
                <Row>
                    <Col className='img-col-blog-col'>
                        <img src={`${process.env.PUBLIC_URL}${imagePath}`} alt="Blog 1" className='img-fluid img-card-blog' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Body className='card-body-blog'>
                            <Card.Text className='card-text-blog'>
                                {shortenedBlog}
                            </Card.Text>
                            <Button variant="dark" className="w-100">Read</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card >
    )
}

export default MostViewedCard