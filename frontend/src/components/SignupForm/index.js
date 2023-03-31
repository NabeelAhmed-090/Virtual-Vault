import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import ErrorToaster from '../ErrorToaster'

const SignupForm = ({ login, setLogin }) => {

    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [fieldsCheck, setFieldsCheck] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState(false)

    const handleSignup = (e) => {
        e.preventDefault()
        if (email === "" || password === "" || userName === "" || firstName === "" || lastName === "" || confirmPassword === "") {
            console.log(email, password, userName, firstName, lastName, confirmPassword)
            setFieldsCheck(true)
            return
        }
        else if (password !== confirmPassword) {
            setPasswordCheck(true)
        }
        else {
            // dispatch(loginFunction(email, password))
        }
    }

    return (
        <div className={login ? "hide" : "display"}>
            <Row className='mt-5'>
                <Col md={12} sm={12} lg={12}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmailSignup">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        className='shadow-none'
                                        type="email"
                                        placeholder="Enter Email"
                                        onBlur={(e) => setEmail(e.target.value)}
                                    />
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
                                    <Form.Control
                                        className='shadow-none'
                                        type="text"
                                        placeholder="Enter User Name"
                                        onBlur={(e) => setUserName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12} lg={6}>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        className='shadow-none'
                                        type="text"
                                        placeholder="Enter First Name"
                                        onBlur={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        className='shadow-none'
                                        type="text"
                                        placeholder="Enter Last Name"
                                        onBlur={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPasswordSignup">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        className='shadow-none'
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        className='shadow-none'
                                        type="password"
                                        placeholder="Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="dark" className='w-100' type="submit" onClick={(e) => handleSignup(e)}>
                            Signup
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <p>Already have an account?
                        <button className='switch' onClick={() => setLogin(true)}>Login</button>
                    </p>
                </Col>
            </Row>
            <ErrorToaster display={fieldsCheck} message="Required fields missing" />
            <ErrorToaster display={passwordCheck} message="Passwords dont match" />
        </div>
    )
}

export default SignupForm