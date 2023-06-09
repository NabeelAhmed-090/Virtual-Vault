import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import ErrorToaster from '../../components/ErrorToaster';

function CreateBlog() {
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');

  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidBlog, setIsValidBlog] = useState(true);

  const handleBlogChange = (e) => {
    const enteredValue = e.target.value;

    if (enteredValue.length <= 500) {
      setBlog(enteredValue);
      setIsValidBlog(true);
    } else {
      setIsValidBlog(false);
    }
  };

  const handleTitleChange = (e) => {
    const enteredValue = e.target.value;

    if (enteredValue.length <= 20) {
      setTitle(enteredValue);
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || blog.length === 0 || selectedImage === null) {
      return;
    }
    try {
      setLoading(true);
      const blogData = new FormData();
      blogData.append('title', title);
      blogData.append('blog', blog);
      blogData.append('user', userInfo._id);
      blogData.append('image', selectedImage);
      await axios.post('http://localhost:5000/api/blogs/create', blogData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setCreated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        minHeight: '70vh',
        border: '1px solid black',
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.4)'
      }}
      className="mt-5 mb-5"
    >
      {loading === true ? (
        <div className="temp-height">
          <Loader />
        </div>
      ) : (
        <>
          <Row className="text-center" style={{ height: '12vh' }}>
            <h1>Create Blog</h1>
          </Row>
          <Row style={{ minHeight: '70vh' }}>
            <Col md={12} sm={12} lg={6} style={{ height: '70vh' }}>
              {imageUrl ? (
                <div
                  style={{
                    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.4)',
                    padding: '10px'
                  }}
                  className="mb-5 full-height"
                >
                  <img
                    src={imageUrl}
                    alt="blog"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <label htmlFor="upload-button">
                    <input
                      id="upload-button"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <span className="cursor">
                      {' '}
                      <FaUpload /> Upload Image
                    </span>
                  </label>
                </div>
              )}
            </Col>
            <Col md={12} sm={12} lg={6} style={{ height: '70vh' }}>
              <Form>
                <Row className="text-center" style={{ height: '20vh' }}>
                  <Form.Group as={Col} md="12">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      className={'shadow-none'}
                      required
                      type="text"
                      placeholder="enter title"
                      value={title}
                      onChange={handleTitleChange}
                      isInvalid={!isValidTitle}
                    />
                    <Row className="d-flex justify-content-end">
                      <Col md={2} sm={12} lg={2} className="d-flex justify-content-end">
                        <pre>{title.length}/20</pre>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>

                <Row style={{ height: '30vh' }} className="text-center mb-2">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className={'shadow-none'}
                      style={{ height: '100%' }}
                      required
                      as="textarea"
                      placeholder="Enter description"
                      value={blog}
                      onChange={handleBlogChange}
                      isInvalid={!isValidBlog}
                    />
                    <Row className="d-flex justify-content-end">
                      <Col md={2} sm={12} lg={2} className="d-flex justify-content-end">
                        <pre>{blog.length}/500</pre>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button
                      disabled={created}
                      variant="dark"
                      className="mt-5 w-100"
                      onClick={handleSubmit}
                    >
                      Create Blog
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </>
      )}
      <ErrorToaster display={!!success} error={false} message={'Blog Created'} />
    </Container>
  );
}

export default CreateBlog;
