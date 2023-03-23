import React from 'react'
import { Row, Col, Container } from "react-bootstrap"
import HomePageCard from '../../components/HomePageCard'
import ControlledCarousel from '../../components/HomePageCarousel'
import Card_1 from '../../Images/Card_1.jpg'
import './index.css'

const Home = () => {
    return (
        <>
            <ControlledCarousel />
            <Container>
                <Row>
                    <Col className='mt-5 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="FIFA 23" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                    <Col className='mt-5 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="WWE 23" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                    <Col className='mt-5 mb-5' md={4} sm={12} lg={4}>
                        <HomePageCard title="GOG OF WAR" owner="Nabeel Ahmed" img={Card_1} />
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Row>

                </Row>
            </Container>
        </>
    )
}

export default Home