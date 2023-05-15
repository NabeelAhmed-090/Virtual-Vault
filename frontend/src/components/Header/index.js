import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faMagnifyingGlass, faCartShopping, faUser, faRightFromBracket, faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../Sidebar'
import { logout } from '../../actions/userActions'
import { emptyCart } from '../../actions/cartActions'
import Notifications from '../Notifications'
import './index.css'



const Header = ({ isOpen, setIsOpen }) => {
    let history = useNavigate()
    let dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };


    const handleLogout = async () => {
        dispatch(emptyCart())
        dispatch(logout())
        history("/")
    }
    return (
        <>
            {
                userInfo && userInfo.isAdmin === false && <Sidebar isOpen={isOpen} handleButtonClick={handleButtonClick} />
            }
            <div className='navbar-div'>
                <Container className='p-2'>
                    <Row>
                        <Col className='title-col' md={4} sm={6} lg={4}>
                            <h3>
                                <a style={{ textDecoration: "none", color: "white" }} href="/home">
                                    Virtual Vault
                                </a>
                            </h3>
                        </Col>
                        {
                            userInfo && userInfo.isAdmin === true && (
                                <Col md={8} sm={6} lg={8} className='d-flex justify-content-end'>
                                    <a className='options cursor' href="#" onClick={() => handleLogout()}>Logout <FontAwesomeIcon icon={faRightFromBracket} className='icons' /></a>
                                </Col>
                            )
                        }
                        {
                            userInfo && userInfo.isAdmin === false && <Col md={8} sm={6} lg={8}>
                                <div className='options-col'>
                                    <Notifications id={userInfo._id} />
                                    <a className='options' href='/blogs' >Blogs <FontAwesomeIcon icon={faBlog} className='icons' /></a>
                                    <a className='options' href='/search'>Search <FontAwesomeIcon icon={faMagnifyingGlass} className='icons' /></a>
                                    <a className='options' href='/cart'>Cart <FontAwesomeIcon icon={faCartShopping} className='icons' /></a>
                                    <a className='options' href='/profile'>Profile <FontAwesomeIcon icon={faUser} className='icons' /></a>
                                    <a className='options cursor' href="#" onClick={() => handleLogout()}>Logout <FontAwesomeIcon icon={faRightFromBracket} className='icons' /></a>
                                </div>
                                <div className='menu-col'>
                                    <button id='menu-button' onClick={() => handleButtonClick()}><FontAwesomeIcon icon={faBars} /> </button>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container>
            </div >
        </>
    )
}

export default Header