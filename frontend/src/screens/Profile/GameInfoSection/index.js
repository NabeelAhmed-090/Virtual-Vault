import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import { FaUpload } from 'react-icons/fa';
import ErrorToaster from '../../../components/ErrorToaster';
import axios from 'axios';
import './index.css'

const GameInfoSection = ({ id, setUserGames }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [units, setUnits] = useState(0);
    const [isGameNew, setIsGameNew] = useState(true);

    const [possibleTags] = useState(["action", "thriller", "combat", "adventure", "strategy", "simulation", "sports", "racing", "puzzle", "arcade", "platformer", "shooter", "fighting", "stealth", "survival", "horror", "battle royale", "role-playing", "mmo", "open world"]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setSelectedImage(null)
        setIsGameNew(true)
        setImageUrl(null)
        setTitle("")
        setDescription("")
        setPrice(0)
        setUnits(0)
        setSelectedTags([])
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
        gameData.append('units', units);
        gameData.append('isGameNew', isGameNew);
        gameData.append('tags', selectedTags)
        gameData.append('image', selectedImage);

        try {
            const { data } = await axios.post('http://localhost:5000/api/games/create', gameData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUserGames(prev => [...prev, data.game])
        } catch (error) {
            console.log(error);
        } finally {
            setSuccess(true);
            setLoading(false);
            resetForm();
        }
    };

    const handleCheckboxChange = (e) => {
        setIsGameNew(e.target.checked);
    };

    const handleTagSelect = (e) => {
        const value = e.target.value;
        if (selectedTags.length >= 5) {
            return;
        }
        setSelectedTags([...selectedTags, value]);
    };

    const handleTagDeselect = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
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
                        <Row>
                            <Col>
                                <Form.Group controlId="tag-selector">
                                    <Form.Label>Select 5 tags</Form.Label>
                                    <Form.Select multiple onChange={handleTagSelect}>
                                        {possibleTags.map((tag) => (
                                            <option
                                                style={{ cursor: "pointer" }}
                                                className={selectedTags.includes(tag) ? "selected-tag" : ""}
                                                key={tag}
                                                value={tag}
                                                disabled={selectedTags.includes(tag)}>
                                                {tag}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={12} sm={12} lg={12}
                                style={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
                                {
                                    selectedTags.map(tag => {
                                        return (
                                            <div
                                                style={{
                                                    height: "50px",
                                                    width: "100px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handleTagDeselect(tag)}
                                                key={`selected ${tag}`}
                                            >
                                                <p style={{ fontSize: "10px" }} className='mt-3'>{tag}</p>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                        <Row style={{ minHeight: "70vh" }} className='mt-5'>
                            <Col md={6} sm={12} lg={6} style={{ height: "70vh" }} className='mt-2'>
                                {imageUrl ? (
                                    <div style={{ boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.4)", padding: "10px" }} className='mb-5 full-height'>
                                        <img src={imageUrl} alt="game cover"
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
                                    <Row className="text-center" style={{ height: "20vh" }}>
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
                                        <Col md={6} sm={12} lg={6} className='mt-2'>
                                            <Form.Check
                                                type="checkbox"
                                                label="new game"
                                                checked={isGameNew}
                                                onChange={(e) => handleCheckboxChange(e)}
                                            />
                                        </Col>
                                        <Col md={6} sm={12} lg={6}>
                                            <Form.Group as={Col} md="12">
                                                <Form.Control
                                                    className={'shadow-none'}
                                                    required
                                                    type="number"
                                                    placeholder="units"
                                                    onChange={(e) => setUnits(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: "30vh" }} className='text-center mt-3'>
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
                                            <Button variant='dark' className='mt-5 w-100' type="button" onClick={handleSubmit}>
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