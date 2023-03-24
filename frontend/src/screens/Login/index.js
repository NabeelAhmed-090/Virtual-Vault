import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './index.css'

const Login = () => {
    const [login, setLogin] = useState(true)
    return (
        <div className='login-main-div'>
            <div className='login-box mt-5'>
                <Container className='full-height p-4'>
                    <Row>
                        <Col className="login-heading mt-3"><h2><b>Welcome</b></h2></Col>
                    </Row>
                    <Row>
                        <Col className="login-heading mt-3"><h4>Virtual Vault</h4></Col>
                    </Row>
                    <div className={login ? "display" : "hide"}>
                        <Row className='mt-5'>
                            <Col md={12} sm={12} lg={12}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control className='shadow-none' type="email" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className='shadow-none' type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="dark" href='/' className='w-100' type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <p>Dont have an account yet?
                                    <button className='switch' onClick={() => setLogin(false)}><u>Signup</u></button>
                                </p>
                            </Col>
                        </Row>
                    </div>
                    <div className={login ? "hide" : "display"}>
                        <Row className='mt-5'>
                            <Col md={12} sm={12} lg={12}>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control className='shadow-none' type="email" placeholder="Enter email" />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} sm={12} lg={6}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control className='shadow-none' type="text" placeholder="Enter First Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} sm={12} lg={6}>
                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control className='shadow-none' type="text" placeholder="Enter Last Name" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control className='shadow-none' type="password" placeholder="Password" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control className='shadow-none' type="password" placeholder="Password" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="dark" className='w-100' type="submit">
                                        Signup
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <p>Already have an account?
                                    <button className='switch' onClick={() => setLogin(true)}><u>Login</u></button>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >

        </div >
    )
}

export default Login