import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Col, Container, Row } from 'react-bootstrap'
import MostViewedCard from '../../components/BlogCard/MostViewedCard'
{/* <img src={require('../../Images/Blogs/blog_1.jpg')} alt="Blog 1" className='img-fluid' /> */ }

const Blogs = () => {
    const [mostViewed, setMostViewed] = useState([])
    const [latest, setLatest] = useState([])
    const [oldArticles, setOldArticles] = useState([])


    useEffect(() => {
        const getBlogs = async () => {
            const { data } = await axios.get("/api/blogs")
            console.log(data.mostViewed)
            setMostViewed(data.mostViewed)
            setLatest(data.latest)
            setOldArticles(data.oldArticles)
        }
        getBlogs()

        return () => {
            setMostViewed([])
            setLatest([])
            setOldArticles([])
        };
    }, [])

    return (

        <Container>
            <Row>
                {
                    mostViewed.map(blog => {
                        return (
                            <Col md={6} sm={12} lg={6} className='mt-5 mb-3'>
                                <MostViewedCard title={blog.title} blog={blog.blog} user={blog.user} imagePath={blog.imagePath} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default Blogs