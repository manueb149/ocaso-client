import { toast, ToastOptions } from 'react-toastify';

type NotificationType = 'success' | 'info' | 'warn' | 'error';

const Notify = (type: NotificationType = 'info', message = '', time = 15000) => {
  const options: ToastOptions = {
    position: 'bottom-right',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warn':
      toast.warn(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      break;
  }
};

export { Notify };
