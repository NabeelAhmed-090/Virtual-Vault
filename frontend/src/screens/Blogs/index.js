import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Col, Container, Row } from 'react-bootstrap'
import MostViewedCard from '../../components/BlogCard/MostViewedCard'
import blogs from '../../data/blog'
import './index.css'
import Loader from '../../components/Loader'

const Blogs = () => {

    const [loading, setLoading] = useState(true)

    const [mostViewed, setMostViewed] = useState([])
    const [latest, setLatest] = useState([])
    const [oldArticles, setOldArticles] = useState([])

    const [selected, setSeleted] = useState({})
    const [list, setList] = useState([])


    useEffect(() => {
        const getBlogs = async () => {
            const { data } = await axios.get("/api/blogs")
            // const data = blogs
            console.log(data)
            console.log(data.mostViewed)
            setMostViewed(data.mostViewed)
            setLatest(data.latest)
            setOldArticles(data.oldArticles)
            setSeleted(data.latest[0])
            setList(data.latest.slice(1))
            setLoading(false)
        }

        getBlogs()

        return () => {
            setMostViewed([])
            setLatest([])
            setOldArticles([])
        };
    }, [])

    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL}${selected.imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
    };

    const handleListClick = (index) => {
        setSeleted(list[index])
        setList(latest.filter(blog => blog.title !== list[index].title))
    }

    return (
        <div className={loading ? 'temp-height' : 'blog-main-container'}>
            {loading ? <Loader /> :
                <>
                    <Container>
                        <Row className='text-center mt-3'><h1><b>Latest Blogs</b></h1></Row>
                        <Row className='mt-2 selected-row-style'>
                            <Col className='selected-img-col' md={6} sm={12} lg={6}>
                                <div className='selected-img-div' style={styles}>
                                    <h1 className='p-4'><b>{selected.title}</b></h1>
                                </div>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                {
                                    list.map((blog, index) => {
                                        return (
                                            <Row className='list-blog-row '>
                                                <Col className='list-blog-cols cursor' onClick={() => handleListClick(index)}>
                                                    <p><b>{blog.title}</b> {blog.blog.slice(0, 50)}</p>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className='text-center mt-5'><h1><b>Most Viewed Blogs</b></h1></Row>
                        <Row>
                            {
                                mostViewed.map(blog => {
                                    return (
                                        <Col md={3} sm={6} lg={3} className='mt-2 mb-3'>
                                            <MostViewedCard id={blog._id} title={blog.title} blog={blog.blog} user={blog.user} imagePath={blog.imagePath} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </>
            }
        </div>
    )
}
export default Blogs