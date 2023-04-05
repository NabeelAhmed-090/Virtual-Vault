import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LatestSection = ({ latest, selected, handleListClick, styles }) => {

    let history = useNavigate()

    const handleOnClick = () => {
        history(`/blogs/${selected._id}`)
    }
    return (
        <Container>
            <Row className='text-center mt-3'><h1><b>Latest Blogs</b></h1></Row>
            <Row className='mt-2 selected-row-style'>
                <Col className='selected-img-col' md={6} sm={12} lg={6}>
                    <div className='selected-img-div cursor' style={styles} onClick={handleOnClick}>
                        <h1 className='p-4'><b>{selected.title}</b></h1>
                    </div>
                </Col>
                <Col md={6} sm={12} lg={6}>
                    {
                        latest.map((blog, index) => {
                            return (
                                <Row className='list-blog-row' key={blog._id}>
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
    )
}

export default LatestSection