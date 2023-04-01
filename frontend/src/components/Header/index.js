import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faMagnifyingGlass, faCartShopping, faUser, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../Sidebar'
import './index.css'


const Header = ({ isOpen, setIsOpen }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {
                userInfo && <Sidebar isOpen={isOpen} handleButtonClick={handleButtonClick} />
            }
            <div className='navbar-div'>
                <Container className='p-2'>
                    <Row>
                        <Col className='title-col' md={6} sm={6} lg={6}>
                            <h3>Virtual Vault</h3>
                        </Col>
                        {
                            userInfo && <Col md={6} sm={6} lg={6}>
                                <div className='options-col'>
                                    <a className='options' href='/' >Blogs <FontAwesomeIcon icon={faBlog} className='icons' /></a>
                                    <a className='options' href='/'>Search <FontAwesomeIcon icon={faMagnifyingGlass} className='icons' /></a>
                                    <a className='options' href='/'>Cart <FontAwesomeIcon icon={faCartShopping} className='icons' /></a>
                                    <a className='options' href='/profile'>Profile <FontAwesomeIcon icon={faUser} className='icons' /></a>
                                    <a className='options' href='/'>Logout <FontAwesomeIcon icon={faRightFromBracket} className='icons' /></a>
                                </div>
                                <div className='menu-col'>
                                    <button id='menu-button' onClick={() => handleButtonClick()}><FontAwesomeIcon icon={faBars} /> </button>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Header