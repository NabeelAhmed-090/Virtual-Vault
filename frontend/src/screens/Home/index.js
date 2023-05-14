import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Container, Button } from "react-bootstrap"
import HomePageCard from '../../components/HomePageCard'
import ControlledCarousel from '../../components/HomePageCarousel'
import BlogBackground from '../../Images/home_blog_2.jpg'
import './index.css'
import Loader from '../../components/Loader'

const Home = () => {

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchLatestGames = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/games/latest')
                setGames(data.games)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLatestGames()
    }, [])

    return (
        <>
            {
                loading ? <div style={{ height: "80vh" }}>
                    <Loader />
                </div> : (
                    <>
                        <ControlledCarousel />
                        <div className='blog-container'>

                            <Row style={{ borderTop: "3px solid silver" }}>
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
                        <Container>
                            <Row className='text-center mt-5'>
                                <h1 style={{ fontWeight: "bolder" }}>
                                    Latest Game On The Market
                                </h1>
                            </Row>
                            <Row className='mt-5 w-100'>
                                {
                                    games.map(game => {
                                        return (
                                            <Col md={4} sm={12} lg={4}>
                                                <HomePageCard game={game} />
                                            </Col>
                                        )
                                    }
                                    )
                                }
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
    )
}

export default Home