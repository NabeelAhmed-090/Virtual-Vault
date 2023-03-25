import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const SignupForm = ({ login, setLogin }) => {
    return (
        <div className={login ? "hide" : "display"}>
            <Row className='mt-5'>
                <Col md={12} sm={12} lg={12}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmailSignup">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control className='shadow-none' type="email" placeholder="Enter Email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control className='shadow-none' type="text" placeholder="Enter User Name" />
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
                                <Form.Group className="mb-3" controlId="formBasicPasswordSignup">
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
    )
}

export default SignupForm