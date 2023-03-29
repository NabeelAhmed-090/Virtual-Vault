import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { loginFunction } from '../../actions/userActions'
import Loader from '../Loader'
import ErrorToaster from '../ErrorToaster'
import './index.css'


const LoginForm = ({ login, setLogin }) => {
    let history = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error } = userLogin

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fieldsCheck, setFieldsCheck] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            if (password.length == 0 && email.length == 0) {
                setFieldsCheck(true)
            } else {
                setFieldsCheck(false)
                dispatch(loginFunction(email, password))
            }
        } catch (error) {
            setEmail("")
            setPassword("")
        }
    }

    useEffect(() => {
        if (error) {
            console.log("error", error)
            setEmail("")
            setPassword("")
        }
    }, [error])

    return (
        <div className={login ? "display main-div" : "hide main-div"}>
            {loading ? <Loader /> : <>
                <Row className='mt-5'>
                    <Col md={12} sm={12} lg={12}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    className={'shadow-none'}
                                    type="email"
                                    placeholder="Enter email"
                                    onBlur={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className={'shadow-none'}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </Form.Group>
                            <Button variant="dark" href='/' className='w-100 mt-3' type="button" onClick={(e) => handleLogin(e)}>
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

                <ErrorToaster display={!!error} message="Invalid username or password" />
                <ErrorToaster display={fieldsCheck} message="Required fields missing" />
            </>
            }
        </div>
    )
}

export default LoginForm