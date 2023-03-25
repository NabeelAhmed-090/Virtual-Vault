import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { loginFunction } from '../../actions/userActions'
import Loader from '../Loader'
import './index.css'

const LoginForm = ({ login, setLogin }) => {
    let history = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginFunction(email, password))
    }

    useEffect(() => {
        console.log("userinfo", userInfo)
        if (error) {
            console.log("error", error)
        }
        if (userInfo) {
            history("/home")
        }
    }, [userInfo, error])

    return (
        <div className={login ? "display" : "hide"}>
            {loading ? <Loader /> : <>
                <Row className='mt-5'>
                    <Col md={12} sm={12} lg={12}>
                        {
                            error && <h3 className="credentials pb-4"><b><u>Invalid Credentials</u></b></h3>
                        }
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
                            <Button variant="dark" href='/' className='w-100 mt-3' type="submit" onClick={(e) => handleLogin(e)}>
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
            </>
            }
        </div>
    )
}

export default LoginForm