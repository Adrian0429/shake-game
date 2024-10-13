import { toast } from 'react-toastify';

// Success Toast
export const showSuccessToast = (message:string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Optional: control the duration here
  });
};

// Error Toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

// Info Toast
export const showInfoToast = () => {
  toast.info('This is some info message!', {
    position: "top-right",
    autoClose: 3000,
  });
};