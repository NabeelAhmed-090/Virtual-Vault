import React from 'react'
import { Row, Col, Container, Button } from "react-bootstrap"
import HomePageCard from '../../components/HomePageCard'
import ControlledCarousel from '../../components/HomePageCarousel'
import Card_1 from '../../Images/Card_1.jpg'
import BlogBackground from '../../Images/home_blog_2.jpg'
import './index.css'

const Home = () => {
    return (
        <>
            <ControlledCarousel />
            <Container>
                <Row className='mt-5'>
                    <Col style={{ textAlign: "center" }}>
                        <h1 style={{ fontWeight: "700" }}>
                            Top Recommended Picks for You
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-2 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="FIFA 23" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                    <Col className='mt-2 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="WWE 23" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                    <Col className='mt-2 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="GOG OF WAR" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                </Row>
            </Container>
            <div className='mt-5 blog-container'>
                <Row>
                    <Col md={4} sm={12} lg={4} className="p-5" style={{ color: "white", display: "flex", justifyContent: 'center', alignItems: "center", textAlign: "center" }}>
                        <Container>
                            <Row>
                                <h1 style={{ fontWeight: "bolder" }}>
                                    Level up your gaming knowledge with our blogs
                                </h1>
                            </Row>
                            <Row className='mt-5'>
                                <a style={{ textDecoration: "none", color: "black" }} href="/blogs">
                                    <Button variant='light' className='w-100'>
                                        DIVE IN
                                    </Button>
                                </a>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} lg={8}>
                        <img src={BlogBackground} alt="blog" className='img-fluid' />
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default Home