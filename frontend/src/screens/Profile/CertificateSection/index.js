import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../Images/logo.jpg'


const CertificateSection = ({ userCertificates }) => {

    let history = useNavigate()

    const handleCertificateClick = async (_id) => {
        history(`/certificate/${_id}`)
    }
    return (
        <>
            {
                userCertificates.length !== 0 && <Col md={12} lg={12} sm={12} xs={12}>
                    <Container
                        style={{ minHeight: "50vh", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.75)" }}
                        className='mb-5 p-5'
                    >
                        <div className='d-flex flex-column justify-content-center h-100'><h1 className='text-center mt-1'>My Certificates</h1></div>
                        <Row className='mt-5'>
                            {userCertificates.map((certificate) => {
                                return (
                                    <>
                                        <Col md={2} lg={2} sm={4} xs={4} className='p-2' style={{ height: "10vh" }}>
                                            <img src={Logo} alt={certificate.title} className='certificate-image' style={{ height: "100%", width: "100%" }} />
                                        </Col>
                                        <Col md={4} lg={4} sm={8} xs={8} style={{ height: "10vh" }} className='p-2 d-flex align-items-center'>
                                            <h3 className='cursor' onClick={() => handleCertificateClick(certificate._id)}>{certificate.title}</h3>
                                        </Col>
                                    </>
                                )
                            })
                            }
                        </Row>
                    </Container>
                </Col>
            }
        </>
    )
}

export default CertificateSection