import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ErrorToaster from '../../components/ErrorToaster'
import AddressMap from './AddressMap'


const DeliveryInfo = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const { total } = useParams()

    const [additionalInfo, setAdditionalInfo] = useState("")
    const [address, setAddress] = useState("")
    const [saveAddressError, setSaveAddressError] = useState(false)

    const proceedToPayment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/games/create-checkout-session', { cartItems, total })
            window.location.href = data.url;
        } catch (error) {
            console.log(error)
        }
    }

    const saveInfo = async () => {
        if (address === null || address === "") {
            setSaveAddressError(true)
        } else {
            try {
                await axios.post('http://localhost:5000/api/delivery/set', { address, additionalInfo: additionalInfo, user: userInfo._id })
            } catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(() => {
        if (saveAddressError) {
            setTimeout(() => {
                setSaveAddressError(false)
            }, 1000)
        }
    }, [saveAddressError])

    useEffect(() => {
        const fetchDeliveryAddress = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/delivery/${userInfo._id}`)
                setAddress(data.address.address)
                setAdditionalInfo(data.address.additionalInfo)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDeliveryAddress()
    }, [userInfo._id])

    return (
        <Container className='p-5'>
            <Row className='mt-3'>
                <h1>Delivery Information</h1>
            </Row>
            <Row className='mt-3'>
                <Col style={{ height: "80vh" }}>
                    <AddressMap address={address} setAddress={setAddress} />
                </Col>
            </Row>
            <Row style={{ height: "30vh", marginTop: "15vh" }} className='text-center mb-2'>
                <Form.Group as={Col} md="12">
                    <Form.Label>Any additional Information for delivery</Form.Label>
                    <Form.Control
                        className={'shadow-none'}
                        style={{ height: "100%" }}
                        required
                        as="textarea"
                        placeholder="Enter additional info"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mt-5'>
                <Col md={6} sm={12} lg={6}>
                    <Button variant='dark' className='w-100' onClick={saveInfo}>
                        Save Delivery Info
                    </Button>
                </Col>
                <Col md={6} sm={12} lg={6}>
                    <Button variant='dark' className='w-100' onClick={proceedToPayment}>
                        Proceed to Payment
                    </Button>
                </Col>
            </Row>
            <ErrorToaster display={!!saveAddressError} message={"Incomplete Information"} />
        </Container>
    )
}

export default DeliveryInfo