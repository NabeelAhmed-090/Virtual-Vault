import React from 'react';
import { Spinner } from 'react-bootstrap';
import './index.css'

const Loader = ({ message }) => {
    return (
        <div>
            <Spinner
                animation='border'
                role='status'
                className='loader mt-5'
            />
            <h3 className='text-center mt-3'>{message}</h3>
        </div>

    )
};

export default Loader;