import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const ErrorToaster = ({ display, message, error = true }) => {
  const toasterBlock = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  useEffect(() => {
    try {
      if (display) {
        {
          error ? toast.error(message, toasterBlock) : toast.success(message, toasterBlock);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [display, message, error]);

  return (
    <div>
      <ToastContainer className="toaster-style" />
    </div>
  );
};

export default ErrorToaster;
