import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBlog, faMagnifyingGlass, faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { logout } from '../../actions/userActions';



function Sidebar({ isOpen, handleButtonClick }) {
    let history = useNavigate()
    let dispatch = useDispatch()


    const handleLogout = async () => {
        dispatch(logout())
        history("/")
    }
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <Container>
                <Row>
                    <Col className='sidebar-button-col'>
                        <button className="toggle-button" onClick={handleButtonClick}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </Col>
                </Row>
                <div className="sidebar-content">
                    <Row>
                        <Col>
                            <a className='options' href='/blogs' >Blogs <FontAwesomeIcon icon={faBlog} className='icons' /></a>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <a className='options' href='/search'>Search <FontAwesomeIcon icon={faMagnifyingGlass} className='icons' /></a>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <a className='options' href='/'>Cart <FontAwesomeIcon icon={faCartShopping} className='icons' /></a>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <a className='options' href='/profile'>Profile <FontAwesomeIcon icon={faUser} className='icons' /></a>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <a className='options cursor' onClick={() => handleLogout()}>Logout <FontAwesomeIcon icon={faRightFromBracket} className='icons' /></a>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}


export default Sidebar;
