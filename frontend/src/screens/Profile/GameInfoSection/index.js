import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import { FaUpload } from 'react-icons/fa';
import ErrorToaster from '../../../components/ErrorToaster';
import axios from 'axios';

const GameInfoSection = ({ id }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isNew, setIsNew] = useState(true);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setSelectedImage(null)
        setImageUrl(null)
        setTitle("")
        setDescription("")
        setPrice(0)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        const gameData = new FormData();
        gameData.append('seller', id);
        gameData.append('title', title);
        gameData.append('description', description);
        gameData.append('price', price);
        gameData.append('isNew', isNew);
        gameData.append('image', selectedImage);

        try {
            const response = await axios.post('http://localhost:5000/api/games/create', gameData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSuccess(true);
            setLoading(false);
            resetForm();
        }
    };

    const handleCheckboxChange = (e) => {
        setIsNew(e.target.checked);
    };


    return (
        <Container
            style={{ minHeight: "50vh", boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.75)" }}>
            {(loading === true)
                ? (
                    <div className='temp-height'>
                        <Loader />
                    </div>) :
                (
                    <>
                        <Row className='text-center mt-2' style={{ height: "12vh" }}>
                            <h1>Upload New Game</h1>
                        </Row>
                        <Row style={{ minHeight: "70vh" }}>
                            <Col md={12} sm={12} lg={6} style={{ height: "70vh" }}>
                                {imageUrl ? (
                                    <div style={{ boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.4)", padding: "10px" }} className='mb-5 full-height'>
                                        <img src={imageUrl} alt="Uploaded image"
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <label htmlFor="upload-button">
                                            <input id="upload-button" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                                            <span className='cursor'> <FaUpload /> Upload Image</span>
                                        </label>
                                    </div>
                                )}
                            </Col>
                            <Col md={12} sm={12} lg={6} style={{ height: "75vh" }}>
                                <Form>
                                    <Row className="text-center mt-2" style={{ height: "20vh" }}>
                                        <Col md={6} sm={12} lg={6}>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    className={'shadow-none'}
                                                    required
                                                    type="text"
                                                    placeholder="enter title"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} sm={12} lg={6}>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    className={'shadow-none'}
                                                    required
                                                    type="number"
                                                    placeholder="enter price"
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='mt-2'>
                                            <Form.Check
                                                type="checkbox"
                                                label="new game"
                                                checked={isNew}
                                                onChange={handleCheckboxChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ height: "30vh" }} className='text-center'>
                                        <Form.Group as={Col} md="12">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                className={'shadow-none'}
                                                style={{ height: "100%" }}
                                                required
                                                as="textarea"
                                                placeholder="Enter description"
                                                onChange={(e) => setDescription(e.target.value)}
                                                value={description}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant='dark' className='mt-5 w-100' onClick={handleSubmit}>
                                                Upload Game
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </>
                )}
            <ErrorToaster display={!!success} error={false} message={'Game Uploaded'} />
        </Container>
    )
}

export default GameInfoSection