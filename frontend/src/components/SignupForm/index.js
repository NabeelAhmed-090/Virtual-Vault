import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { registerFunction } from '../../actions/userActions'
import Loader from '../Loader'
import ErrorToaster from '../ErrorToaster'


const SignupForm = ({ login, setLogin }) => {
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error } = userRegister


    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [requestLoading, setRequestLoading] = useState(false)

    const [type, setType] = useState(true)
    const [confirmType, setConfirmType] = useState(true)
    const [validated, setValidated] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);


    const resetForm = () => {
        setEmail("")
        setUserName("")
        setFirstName("")
        setLastName("")
        setCity("")
        setPassword("")
        setConfirmPassword("")
        setValidated(false);
        setConfirmPasswordValid(false)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false || confirmPasswordValid === false) {
            event.stopPropagation();
        } else {
            try {
                setRequestLoading(true)
                dispatch(registerFunction(email, password, userName, firstName, lastName, city))
            } catch (error) {
                resetForm()
            } finally {
                setRequestLoading(false)
            }
        }
        setValidated(true);
    };

    useEffect(() => {
        if (password === confirmPassword) {
            setConfirmPasswordValid(true);
        } else {
            setConfirmPasswordValid(false);
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        if (error) {
            resetForm()
        }
    }, [error])

    return (
        <div className={login ? "hide" : "display"}>
            {(loading || requestLoading === true) ? <Loader message={"Creating account"} /> : <>
                <Row className='mt-5'>
                    <Col md={12} sm={12} lg={12}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className={'shadow-none'}
                                        required
                                        type="email"
                                        placeholder="enter email"
                                        onBlur={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Valid email is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationUsername">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="usernamePrepend"><b>@</b></InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            aria-describedby="usernamePrepend"
                                            required
                                            onBlur={(e) => setUserName(e.target.value)}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a username.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        className={'shadow-none'}
                                        required
                                        type="text"
                                        placeholder="enter first name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        First name is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        className={'shadow-none'}
                                        required
                                        type="text"
                                        placeholder="enter last name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Last name is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className={'shadow-none'}
                                        required
                                        type="text"
                                        placeholder="enter city"
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        City is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationPasswordSignup">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type={type ? "password" : "text"}
                                            placeholder="password"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text id="inputGroupPrepend" className='cursor' onClick={() => setType(prev => !prev)}>
                                            <FontAwesomeIcon icon={type ? faEye : faEyeSlash} />
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number ,and one special character).
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationConfirmPasswordSignup">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type={confirmType ? "password" : "text"}
                                            placeholder="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            isInvalid={!confirmPasswordValid}
                                        />
                                        <InputGroup.Text id="inputGroupPrepend" className='cursor' onClick={() => setConfirmType(prev => !prev)}>
                                            <FontAwesomeIcon icon={confirmType ? faEye : faEyeSlash} />
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {confirmPasswordValid ? "confirm password to proceed" : "passwords do not match"}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Button type="submit" variant="dark" className='w-100 mt-3'>Signup</Button>
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
                <ErrorToaster display={!!error} message={(error && error.includes("500") === true) ? "Unable to connect to server" : `${error}`} />
            </>
            }
        </div>
    )
}

export default SignupForm