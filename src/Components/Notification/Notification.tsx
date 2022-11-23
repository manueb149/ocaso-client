import { ToastContainer } from 'react-toastify';

const Notification: React.FC = () => {
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
