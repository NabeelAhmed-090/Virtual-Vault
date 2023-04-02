import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './index.css'

const MostViewedCard = ({ title, blog, user, imagePath }) => {
    const shortenedBlog = blog.slice(0, 200) + ".......";
    return (
        <Card className='mt-3 main-card-blog '>
            <Container>
                <Card.Header className='text-center'><b>{title}</b></Card.Header>
                <Row>
                    <Col className='img-col-blog'>
                        <img src={`${process.env.PUBLIC_URL}${imagePath}`} alt="Blog 1" className='img-fluid' />
                    </Col>
                </Row>
                <Card.Body className='card-body-blog'>
                    <Card.Text className='card-text-blog'>
                        {shortenedBlog}
                    </Card.Text>
                    <Button variant="dark" className="w-100">Go somewhere</Button>
                </Card.Body>
            </Container>
        </Card>
    )
}

export default MostViewedCard