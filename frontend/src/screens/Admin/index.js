import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';

const Admin = () => {
  const BLOGS = 'BLOGS';
  const SELLERS = 'SELLERS';

  let history = useNavigate();

  const [display, setDisplay] = useState(BLOGS);
  const [sellers, setSellers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRead = (id) => {
    history(`/blogs/${id}`);
  };

  const handleApproval = async (id, status) => {
    const { data } = await axios.put(`/api/blogs/update`, {
      id: id,
      isApproved: status
    });
    if (data.blog !== null) {
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === data.blog._id) {
          blog.isApproved = data.blog.isApproved;
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    }
  };

  const handleGrantCertificate = async (id) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/certificate/grant`, {
        id: id,
        title: 'Excellent Seller',
        message:
          'This certificate is presented to Mr/Mrs Arshad in recognition of their outstanding performance and unwavering commitment to excellence in sales. Through hard work, dedication, and a customer-centric approach, Mr/Mrs Arshad has demonstrated exceptional sales skills and consistently exceeded expectations. Their ability to understand the needs of their clients and provide them with the best solutions is truly commendable. We are proud to recognize Mr/Mrs Arshad for their exceptional performance, and we believe that they truly deserve this Certificate of Excellence.'
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSellers = async () => {
      const { data } = await axios.get('/api/sales');
      setSellers(data.sellers);
    };
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs/all');
      const data = await res.json();
      setBlogs(data.blogs);
      setLoading(false);
    };
    setLoading(true);
    fetchBlogs();
    fetchSellers();
    setLoading(false);

    return () => {
      setBlogs([]);
    };
  }, []);

  return (
    <Container>
      {loading ? (
        <div style={{ height: '80vh' }}>
          {' '}
          <Loader />{' '}
        </div>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={12} lg={12} sm={12}>
                <h1 className="text-center mt-3">Admin Panel</h1>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={6} sm={12}>
                <Button variant="dark" className="mt-3 w-100" onClick={() => setDisplay(BLOGS)}>
                  Review Blogs
                </Button>
              </Col>
              <Col md={6} lg={6} sm={12}>
                <Button variant="dark" className="mt-3 w-100" onClick={() => setDisplay(SELLERS)}>
                  Review Sellers
                </Button>
              </Col>
            </Row>
          </Container>

          {display === BLOGS &&
            blogs.map((blog) => {
              return (
                <Container
                  key={blog._id}
                  className="p-2 mt-5"
                  style={{ boxShadow: '2px 2px 8px rgba(0,0,0,0.75)' }}
                >
                  <Row>
                    <Col md={3} lg={3} sm={12}>
                      <img
                        src={blog.imagePath}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Col>
                    <Col md={9} lg={9} sm={12}>
                      <Row className="mt-3">
                        <Col md={8} lg={8} sm={12}>
                          <h6>
                            <b>Title</b> : {blog.title}
                          </h6>
                        </Col>
                        <Col md={4} lg={4} sm={12}>
                          {blog.isApproved === false ? (
                            <Badge bg="danger badge-media-style py-2">not approved</Badge>
                          ) : (
                            <Badge bg="success badge-media-style py-2">approved</Badge>
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          <h6>
                            <b>Total Views</b> : {blog.totalViews}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>
                            <b>Created At</b> : {formatDate(blog.createdAt)}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>
                            <b>User</b> : {blog.user}{' '}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} lg={6} sm={12}>
                          {blog.isApproved === false ? (
                            <Button
                              variant="success"
                              className="mt-2 w-100"
                              onClick={() => handleApproval(blog._id, true)}
                            >
                              Approve
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              className="mt-2 w-100"
                              onClick={() => handleApproval(blog._id, false)}
                            >
                              Unapprove
                            </Button>
                          )}
                        </Col>
                        <Col md={6} lg={6} sm={12}>
                          <Button
                            variant="dark"
                            className="mt-2 w-100"
                            onClick={() => handleRead(blog._id)}
                          >
                            Read
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          {display === SELLERS && (
            <Container>
              <Row className="mt-5">
                {sellers.map((seller) => {
                  return (
                    <Col
                      key={seller.user.userName}
                      md={4}
                      lg={4}
                      sm={12}
                      xs={12}
                      className="mt-1 mb-5 p-2"
                    >
                      <Card className="mt-1 mb-5 p-2" style={{ height: '80vh' }}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Container>
                            <Row className="d-flex justify-content-center">
                              <Col md={8} lg={8} sm={12} xs={12} style={{ height: '20vh' }}>
                                <Badge
                                  bg="dark"
                                  className="w-100 initials-badge rounded-circle avatar-style"
                                >
                                  {seller.user.userName.charAt(0).toUpperCase()}
                                </Badge>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12} lg={12} sm={12} className="text-center mt-2">
                                <h6>
                                  <Card.Title>
                                    <b>{seller.user.userName}</b>
                                  </Card.Title>
                                </h6>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12} lg={12} sm={12} className="mt-3 text-center">
                                <h6>
                                  <Card.Text>
                                    <b>{seller.user.city}</b>
                                  </Card.Text>
                                </h6>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col md={6} lg={6} sm={6}>
                                <h6>
                                  <Card.Text>
                                    <b>Amount</b>
                                  </Card.Text>
                                </h6>
                              </Col>
                              <Col md={6} lg={6} sm={6} className="text-end">
                                <h6>
                                  <Card.Text>
                                    <b>{seller.amount}</b>
                                  </Card.Text>
                                </h6>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col md={6} lg={6} sm={6}>
                                <h6>
                                  <Card.Text>
                                    <b>Units Sold</b>
                                  </Card.Text>
                                </h6>
                              </Col>
                              <Col md={6} lg={6} sm={6} className="text-end">
                                <h6>
                                  <Card.Text>
                                    <b>{seller.units}</b>
                                  </Card.Text>
                                </h6>
                              </Col>
                            </Row>
                          </Container>
                          <div className="mt-auto">
                            <Button
                              variant="success"
                              className="w-100 mb-2 button-style-game-card"
                              onClick={() => handleGrantCertificate(seller.user)}
                            >
                              Grant Certificate
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default Admin;
