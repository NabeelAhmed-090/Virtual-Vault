import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { addToCart } from '../../actions/cartActions'
import { set } from 'mongoose'


const Cart = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    let history = useNavigate()

    const location = useLocation()
    const { id } = useParams()
    const qty = new URLSearchParams(location.search).get("qty");
    const [total, setTotal] = useState(0)

    const handleContinueShopping = () => {
        history('/search')
    }
    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => acc + item.price * item.unitsInCart, 0))
    }, [])

    useEffect(() => {
        if (id && qty) {
            dispatch(addToCart(id, qty))
        }

    }, [id, qty])


    return (
        <Container className='justify-content-center'>
            {cartItems.length === 0 &&
                <Row>

                    (
                    <Row style={{ height: "60vh" }} className='d-flex justify-content-center align-content-center'>
                        <Col md={6} lg={6} sm={12}>
                            <h1 className='text-center'>Cart is empty</h1>
                            <Button variant='dark' className='w-100' onClick={handleContinueShopping}>Continue Shopping</Button>
                        </Col>
                    </Row>
                    )
                </Row>
            }
            {
                cartItems.length > 0 && (
                    <>
                        <Row className='mt-3'>
                            <h1>Shopping Cart</h1>
                        </Row>
                        <Row style={{ minHeight: "60vh" }} className='justify-content-center'>
                            <Col md={12} lg={12} sm={12}>
                                <Row className='mt-5'>
                                    <Col md={8} lg={8} sm={12}>
                                        <h5>Product</h5>
                                    </Col>
                                    <Col md={2} lg={2} sm={12} style={colsStyling}>
                                        <h5>Price</h5>
                                    </Col>
                                    <Col md={2} lg={2} sm={12} style={colsStyling}>
                                        <h5>Quantity</h5>
                                    </Col>
                                </Row>
                                <hr />
                                {cartItems.map(item => (
                                    <>
                                        <Row key={item.game} className='mb-5'>
                                            <Col md={8} lg={8} sm={12} style={{ borderRight: "1px solid black", height: "10vh" }} className='mt-5'>
                                                <Row>
                                                    <Col md={3} lg={3} sm={12} >
                                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%' }} />
                                                    </Col>
                                                    <Col md={9} lg={9} sm={12}>
                                                        <h5>{item.title}</h5>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={2} lg={2} sm={12} style={colsStyling} className='mt-5'>
                                                <h5>{item.price} PKR</h5>
                                            </Col>
                                            <Col md={2} lg={2} sm={12} style={colsStyling} className='mt-5'>
                                                <h5>{item.unitsInCart}</h5>
                                            </Col>
                                        </Row>
                                        <hr className='mt-5' />
                                    </>
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <h1>Summary</h1>
                        </Row>
                        <Row className='mt-5'>
                            <Col md={6} sm={6} lg={6}>
                                <h5>Subtotal</h5>
                            </Col>
                            <Col md={6} sm={6} lg={6} className='d-flex justify-content-end'>
                                <h5>{total} PKR</h5>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col md={6} sm={6} lg={6}>
                                <h5>Tax</h5>
                            </Col>
                            <Col md={6} sm={6} lg={6} className='d-flex justify-content-end'>
                                <h5>{total * 0.16} PKR</h5>
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col md={6} sm={6} lg={6}>
                                <h5>Total (Incl. Tax)</h5>
                            </Col>
                            <Col md={6} sm={6} lg={6} className='d-flex justify-content-end'>
                                <h5>{total + (total * 0.16)} PKR</h5>
                            </Col>
                        </Row>
                    </>
                )
            }
        </Container>
    )
}

const colsStyling = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export default Cart