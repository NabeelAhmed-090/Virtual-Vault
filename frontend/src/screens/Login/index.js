import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import './index.css'

const Login = () => {
    const [login, setLogin] = useState(false)

    return (
        <div className='login-main-div'>
            <div className='login-box mt-3'>
                <Container className='full-height p-4'>
                    <Row>
                        <Col className="login-heading mt-3"><h2><b>Welcome</b></h2></Col>
                    </Row>
                    <Row>
                        <Col className="login-heading mt-3"><h4>Virtual Vault</h4></Col>
                    </Row>
                    <LoginForm login={login} setLogin={setLogin} />
                    <SignupForm login={login} setLogin={setLogin} />
                </Container>
            </div >

        </div >
    )
}

export default Login