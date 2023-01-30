import { ToastContainer } from 'react-toastify';

/**
 * Toast notificator container.
 * @return {JSX.Element} Loading screen JSX
 */
const Notification: React.FC = (): JSX.Element => {
  return (
    <>
      <ToastContainer
        limit={10}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Notification;
