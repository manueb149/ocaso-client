import { Fragment } from 'react';
import AlertsModal from './AlertsModal/AlertsModal';
import ConfigModal from './ConfigModal/ConfigModal';
import NewPasswordModal from './NewPasswordModal/NewPasswordModal';

const Modals: React.FC = () => {
  return (
    <Fragment>
      <AlertsModal />
      <ConfigModal />
      <NewPasswordModal />
    </Fragment>
  );
};

export default Modals;
