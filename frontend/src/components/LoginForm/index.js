import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginFunction } from '../../actions/userActions'
import Loader from '../Loader'
import ErrorToaster from '../ErrorToaster'
import './index.css'


const LoginForm = ({ login, setLogin }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error } = userLogin

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [type, setType] = useState(true)
    const [validated, setValidated] = useState(false);


    const resetForm = () => {
        setEmail("")
        setPassword("")
        setValidated(false);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            try {
                dispatch(loginFunction(email, password))
            } catch (error) {
                resetForm()
            }
        }
        setValidated(true);
    };

    useEffect(() => {
        if (error) {
            resetForm()
        }
    }, [error])

    return (
        <div className={login ? "display main-div" : "hide main-div"}>
            {loading ? <Loader /> : <>
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
                                        Email is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type={type ? "password" : "text"}
                                            placeholder="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text id="inputGroupPrepend" className='cursor' onClick={() => setType(prev => !prev)}>
                                            <FontAwesomeIcon icon={type ? faEye : faEyeSlash} />
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            password is required
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Button type="submit" variant="dark" className='w-100 mt-3'> Login</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <p>Dont have an account yet?
                            <button className='switch' onClick={() => setLogin(false)}>Signup</button>
                        </p>
                    </Col>
                </Row>
                <ErrorToaster display={!!error} message={(error && error.includes("500") === true) ? "Unable to connect to server" : `${error}`} />
            </>
            }
        </div >
    )
}

export default LoginForm