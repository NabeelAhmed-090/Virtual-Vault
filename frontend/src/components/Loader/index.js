import React from 'react';
import { Spinner } from 'react-bootstrap';
import './index.css'

const Loader = () => {
    return (
        <div className='loader-div'>
            <Spinner
                animation='border'
                role='status'
                className='loader'
            />
        </div>

    )
};

export default Loader;