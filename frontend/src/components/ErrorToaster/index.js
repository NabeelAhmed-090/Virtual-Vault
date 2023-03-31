import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const ErrorToaster = ({ display, message }) => {

    useEffect(() => {
        try {
            if (display) {
                toast.error(message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }, [display, message])

    return (
        <div>
            <ToastContainer className="toaster-style" />
        </div>
    )
}

export default ErrorToaster