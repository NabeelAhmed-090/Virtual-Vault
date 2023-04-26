import html2pdf from 'html2pdf.js';
import React, { useRef } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import signature from '../../Images/signature.jpg'
import logo from '../../Images/logo.jpg'


const Certificate = ({ name }) => {

    // get current date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();


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
                        <h2 className="text-center">Certificate of Excellence</h2>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Col>
                        <p className="text-center">
                            This certificate is presented to <b><b>[Seller's Name]</b></b> in recognition of their outstanding performance and unwavering commitment to excellence in sales.
                            Through hard work, dedication, and a customer-centric approach, <b>[Seller's Name]</b> has demonstrated exceptional sales skills and consistently exceeded expectations. Their ability to understand the needs of their clients and provide them with the best solutions is truly commendable.
                            We are proud to recognize <b>[Seller's Name]</b> for their exceptional performance, and we believe that they truly deserve this Certificate of Excellence.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-end mb-3 mt-5">
                    <Col sm={10}>
                        <p>Date of Completion</p>
                        <p>{dd}-{mm}-{yyyy}</p>
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
    );
};

export default Certificate;
