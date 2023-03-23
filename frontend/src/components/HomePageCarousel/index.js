import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img_1 from '../../Images/home_bg_1.jpg'
import Img_2 from '../../Images/home_bg_2.jpg'


function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src={Img_1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h1>Home of Gaming</h1>
                    <h5>Get Your Game On: The Ultimate Destination for Gamers!</h5>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src={Img_2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h1>Gamers Paradise</h1>
                    <h5>Get Ready to Level Up: The Ultimate Gaming Destination!</h5>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel