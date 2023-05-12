import html2pdf from 'html2pdf.js';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import signature from '../../Images/signature.jpg'
import logo from '../../Images/logo.jpg'
import axios from 'axios';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';


const Certificate = () => {

    let { id } = useParams();

    const [certificate, setCertificate] = useState({})
    const [date, setDate] = useState('')
    const [user, setUser] = useState({})

    const [loading, setLoading] = useState(true)

    const capitalizeFirstLetter = (str) => {
        return str.toLowerCase().split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    useEffect(() => {
        const fetchCertificate = async () => {
            const { data } = await axios.get(`/api/certificate/${id}`)
            setCertificate(data.certificate)
            setUser({
                ...data.user,
                lastName: capitalizeFirstLetter(data.user.lastName)
            })
            const date = new Date(data.certificate.createdAt);
            const formattedDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            setDate(formattedDate)
            setLoading(false)
        }
        setLoading(true)
        fetchCertificate()
        return () => {
            setCertificate([])
        }
    }, [id])

    const componentRef = useRef(null);

    const downloadPdf = () => {
        const input = componentRef.current;
        const height = input.offsetHeight;
        const options = {
            margin: 0.5,
            filename: 'certificate.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', height },
        };

        html2pdf().set(options).from(input).save();
    };

    return (
        <>
            {
                loading ?
                    (
                        <div style={{ height: "60vh" }}>
                            <Loader />
                        </div>
                    ) :
                    (
                        <>
                            <Container className="my-5 p-5" style={{ boxShadow: "0 0 6px rgb(0,0,0.5)" }} ref={componentRef}>
                                <Row className='mt-3'>
                                    <Col className='d-flex justify-content-center'>
                                        <img src={logo} height={100} width={100} alt="Logo" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-3'>
                                        <h1 className="text-center">Virtual Vault</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-3'>
                                        <h2 className="text-center">{certificate.title}</h2>
                                    </Col>
                                </Row>
                                <Row className='mt-5'>
                                    <Col>
                                        <p className="text-center">
                                            This certificate is presented to <b><b>Mr/Mrs {user.lastName}</b></b> in recognition of their outstanding performance and unwavering commitment to excellence in sales.
                                            Through hard work, dedication, and a customer-centric approach, <b>Mr/Mrs {user.lastName}</b> has demonstrated exceptional sales skills and consistently exceeded expectations. Their ability to understand the needs of their clients and provide them with the best solutions is truly commendable.
                                            We are proud to recognize <b>Mr/Mrs {user.lastName}</b> for their exceptional performance, and we believe that they truly deserve this Certificate of Excellence.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-end mb-3 mt-5">
                                    <Col sm={10}>
                                        <p>Date of Completion</p>
                                        <p>{date}</p>
                                    </Col>
                                    <Col sm={2} className="justify-content-end mb-3">
                                        <p>Signature</p>
                                        <Image src={signature} height={80} width={80} />
                                    </Col>
                                </Row>
                            </Container>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col md={6} sm={12} lg={6} className="text-center">
                                        <Button variant="dark" className='w-100' onClick={downloadPdf}>
                                            Download Certificate as PDF
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    )
            }
        </>
    );
};

export default Certificate;
