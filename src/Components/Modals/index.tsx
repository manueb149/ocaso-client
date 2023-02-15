import { Fragment } from 'react';
import AlertsModal from './AlertsModal/AlertsModal';
import ConfigModal from './ConfigModal/ConfigModal';
import NewPasswordModal from './NewPasswordModal/NewPasswordModal';
import ViewContactoModal from './ViewContactoModal/ViewContactoModal';

const Modals: React.FC = () => {
  return (
    <Fragment>
      <AlertsModal />
      <ConfigModal />
      <NewPasswordModal />
      <ViewContactoModal />
    </Fragment>
  );
};

export default Modals;
