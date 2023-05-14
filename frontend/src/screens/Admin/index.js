import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import Loader from '../../components/Loader'

const Admin = () => {

    const BLOGS = 'BLOGS'
    const SELLERS = 'SELLERS'

    let history = useNavigate()

    const [display, setDisplay] = useState(BLOGS)
    const [sellers, setSellers] = useState([])
    // const [blogs, setBlogs] = useState([
    //     {
    //         blog: "Tom Clancy's Ghost Recon Breakpoint is an online-only tactical shooter video game developed by Ubisoft Paris and published by Ubisoft. The game was released worldwide on 4 October 2019 for PlayStation 4, Windows, and Xbox One, and on 18 December 2019 for Stadia.",
    //         createdAt: "2023-04-24T17:08:36.750Z",
    //         imagePath: "https://res.cloudinary.com/dcfvlneeh/image/upload/v1682356115/aavl3kaswbb5nicfcdoh.jpg",
    //         isApproved: false,
    //         title: "Tom Clancy Breakpoint",
    //         totalViews: 0,
    //         updatedAt: "2023-04-24T17:08:36.750Z",
    //         user: "6446763df158ebbfc21aaf2a",
    //         _id: "6446b794e398d05486185f03"
    //     },

    //     {
    //         blog: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\\\\n\\\\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    //         createdAt: "2023-04-24T16:55:35.334Z",
    //         imagePath: "https://res.cloudinary.com/dcfvlneeh/image/upload/v1682355334/auteth0tr4oc8tw1wfm6.jpg",
    //         isApproved: false,
    //         title: "Love Movie, The (Rakkauselokuva)\"",
    //         totalViews: 2,
    //         updatedAt: "2023-04-26T06:59:52.169Z",
    //         user: "6446763df158ebbfc21aaf2a",
    //         _id: "6446b4878e460fe158375761"
    //     },

    //     {
    //         blog: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\\\\n\\\\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\\\\n\\\\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    //         createdAt: "2023-04-24T16:54:41.883Z",
    //         imagePath: "https://res.cloudinary.com/dcfvlneeh/image/upload/v1682355280/x6fpjds2au2mq2v29dhg.jpg",
    //         isApproved: false,
    //         title: "Witches, The (aka Devil's Own, The)",
    //         totalViews: 0,
    //         updatedAt: "2023-04-24T16:54:41.883Z",
    //         user: "6446763df158ebbfc21aaf2a",
    //         _id: "6446b4518e460fe15837575f"
    //     }

    // ])
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    const handleRead = (id) => {
        history(`/blogs/${id}`)
    }

    const handleApproval = async (id, status) => {
        const { data } = await axios.put(`/api/blogs/update`, { id: id, isApproved: status })
        if (data.blog !== null) {
            const updatedBlogs = blogs.map((blog) => {
                if (blog._id === data.blog._id) {
                    blog.isApproved = data.blog.isApproved
                }
                return blog
            })
            setBlogs(updatedBlogs)
        }
    }

    useEffect(() => {
        const fetchSellers = async () => {
            const { data } = await axios.get('/api/sales')
            console.log(data.sellers)
            setSellers(data.sellers)
        }
        const fetchBlogs = async () => {
            const res = await fetch('/api/blogs/all')
            const data = await res.json()
            setBlogs(data.blogs)
            setLoading(false)
        }
        setLoading(true)
        fetchBlogs()
        fetchSellers()
        setLoading(false)

        // return () => {
        //     setBlogs([])
        // }
    }, [])

    return (
        <Container>
            {
                loading ? <div style={{ height: "80vh" }}> <Loader /> </div> :
                    (
                        <>
                            <Container>
                                <Row>
                                    <Col md={12} lg={12} sm={12}>
                                        <h1 className='text-center mt-3'>Admin Panel</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Button
                                            variant="dark"
                                            className='mt-3 w-100'
                                            onClick={() => setDisplay(BLOGS)}
                                        >
                                            Review Blogs
                                        </Button>
                                    </Col>
                                    <Col md={6} lg={6} sm={12}>
                                        <Button
                                            variant="dark"
                                            className='mt-3 w-100'
                                            onClick={() => setDisplay(SELLERS)}
                                        >
                                            Review Sellers
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>

                            {
                                display === BLOGS && blogs.map((blog) => {
                                    return (
                                        <Container className='p-2 mt-5' style={{ boxShadow: "2px 2px 8px rgba(0,0,0,0.75)" }}>
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
                                                        <Col md={6} lg={6} sm={12}>
                                                            {
                                                                blog.isApproved === false
                                                                    ? <Button variant="success" className="mt-2 w-100" onClick={() => handleApproval(blog._id, true)}>Approve</Button>
                                                                    : <Button variant="danger" className="mt-2 w-100" onClick={() => handleApproval(blog._id, false)}>Unapprove</Button>
                                                            }
                                                        </Col>
                                                        <Col md={6} lg={6} sm={12}>
                                                            <Button variant="dark" className="mt-2 w-100" onClick={() => handleRead(blog._id)}>Read</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    )
                                })
                            }
                            {

                                display === SELLERS &&
                                (
                                    <Container>
                                        <Row className='mt-5'>
                                            {
                                                sellers.map((seller) => {
                                                    return (
                                                        <Col md={4} lg={4} sm={12} xs={12} className='mt-1 mb-5 p-2'>
                                                            <Card className='mt-1 mb-5 p-2' style={{ height: "55vh" }}>
                                                                <Card.Body className="d-flex flex-column justify-content-between">
                                                                    <Container>
                                                                        <Row className='d-flex justify-content-center'>
                                                                            <Col md={8} lg={8} sm={12} xs={12} style={{ height: "20vh" }}>
                                                                                <Badge
                                                                                    bg="dark"
                                                                                    className="w-100 initials-badge rounded-circle avatar-style"
                                                                                >
                                                                                    {seller.user.userName.charAt(0).toUpperCase()}
                                                                                </Badge>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md={12} lg={12} sm={12} className='text-center mt-2'>
                                                                                <h6><Card.Title><b>{seller.user.userName}</b></Card.Title></h6>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md={12} lg={12} sm={12} className='mt-3 text-center'>
                                                                                <h6><Card.Text><b>{seller.user.city}</b></Card.Text></h6>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mt-3'>
                                                                            <Col md={6} lg={6} sm={6}>
                                                                                <h6><Card.Text><b>Amount</b></Card.Text></h6>
                                                                            </Col>
                                                                            <Col md={6} lg={6} sm={6} className='text-end'>
                                                                                <h6><Card.Text><b>{seller.amount}</b></Card.Text></h6>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mt-3'>
                                                                            <Col md={6} lg={6} sm={6}>
                                                                                <h6><Card.Text><b>Units Sold</b></Card.Text></h6>
                                                                            </Col>
                                                                            <Col md={6} lg={6} sm={6} className='text-end'>
                                                                                <h6><Card.Text><b>{seller.units}</b></Card.Text></h6>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                    <div className="mt-auto">
                                                                        <Button variant="success" className='w-100 mb-2 button-style-game-card'>Grant Certificate</Button>
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                        <Row>
                                            <Col md={12} lg={12} sm={12} className='text-center'>
                                                <Button variant="dark" className='w-100 mb-2'>Reset Record</Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                )

                            }
                        </>
                    )
            }
        </Container>
    )
}

export default Admin