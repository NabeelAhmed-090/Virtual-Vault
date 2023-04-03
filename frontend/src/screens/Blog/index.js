import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Loader from '../../components/Loader';
import { Col, Container, Row } from 'react-bootstrap';
import dummy_blog from '../../data/blog'
import Image from "react-bootstrap/Image";
import './index.css'

const Blog = () => {

    let { id } = useParams();

    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            const { data } = await axios.get(`/api/blogs/${id}`)
            console.log(data)
            setBlog(data)
            setLoading(false)
        }
        fetchBlog()
        return () => {
            setBlog([])
        }
    }, [])

    return (
        <div className={loading ? 'temp-height' : 'main-blog-div'}>
            {loading ? <Loader /> :
                <>
                    <Container className='mt-5'>
                        <Row>
                            <Col>
                                <h1 style={{ textAlign: "center", fontWeight: "bolder" }}>{blog.title}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>by {blog.user}</h5>
                            </Col>
                        </Row>
                        <hr />
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <div style={{ minHeight: "100vh", width: "100%" }}>
                                    <img src={`${process.env.PUBLIC_URL}${blog.imagePath}`} alt="Blog 1" className='img-fluid' />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className='mt-5'>
                            <Col>
                                <p>{blog.blog}</p>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: "right" }}>
                            <Col>
                                <h6>{blog.date}</h6>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </div>
    )
}

export default Blog