import React from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'

const BlogsSection = ({ userBlogs, history }) => {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    const handleRead = (id) => {
        history(`/blogs/${id}`)
    }

    return (
        <Col md={12} lg={12} sm={12} xs={12}>
            <Container
                style={{ minHeight: "50vh", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.75)" }}
                className='mb-5 p-5'
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h1 className='text-center mt-1'>My Blogs</h1></div>
                {
                    userBlogs.length === 0 ? <h3 className='text-center mt-3'>No Blogs</h3> :
                        userBlogs.map((blog) => {
                            return (
                                <Container key={blog._id} className='p-2 mt-2' style={{ boxShadow: "2px 2px 4px rgba(0,0,0,0.75)" }}>
                                    <Row>
                                        <Col md={3} lg={3} sm={12} >
                                            <img src={blog.imagePath} alt={blog.title} style={{ width: '100%', height: '100%' }} />
                                        </Col>
                                        <Col md={9} lg={9} sm={12}>
                                            <Row className='mt-3'>
                                                <Col md={8} lg={8} sm={12}>
                                                    <h6><b>Title</b>       : {blog.title}</h6>
                                                </Col>
                                                <Col md={4} lg={4} sm={12}>
                                                    {
                                                        blog.isApproved === false ?
                                                            <Badge bg="danger badge-media-style py-2">not approved</Badge>
                                                            : <Badge bg="success badge-media-style py-2">approved</Badge>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className='mt-2'>
                                                <Col>
                                                    <h6><b>Total Views</b> : {blog.totalViews}</h6>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h6><b>Created At</b> : {formatDate(blog.createdAt)}</h6>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h6><b>User</b> : {blog.user} </h6>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12} lg={12} sm={12}>
                                                    <Button variant="dark" className="mt-2 w-100" onClick={() => handleRead(blog._id)}>Read</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        })
                }
            </Container>
        </Col>
    )
}

export default BlogsSection