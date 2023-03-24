import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import './index.css'

const Footer = () => {
    return (
        <div className='footer-div mt-3'>
            <Container className="first-container">
                <Row className='first-row'>
                    <h1 className='p-3'>Virtual Vault</h1>
                    <h6>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In praesentium voluptatem autem sed esse, consequatur assumenda nostrum animi quidem deserunt hic asperiores incidunt, facere rem doloribus quasi tempora voluptates, officia natus dolorem tempore? Placeat quod id delectus tenetur ad, magnam impedit, nisi eos illo in facere corporis voluptates quas ab odit iusto officiis aut pariatur. Totam magni iste corporis voluptates.</h6>
                </Row>
            </Container>
            <Container className='second-container pt-2'>
                <Row className='mt-3'>
                    <Col style={{ color: "white" }} md={12} sm={12} lg={12}>
                        Copyright @2023 VirtualVault
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer