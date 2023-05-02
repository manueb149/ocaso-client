import { Fragment } from 'react';
import AlertsModal from './AlertsModal/AlertsModal';
import ConfigModal from './ConfigModal/ConfigModal';
import NewPasswordModal from './NewPasswordModal/NewPasswordModal';
import ViewContactoModal from './ViewContactoModal/ViewContactoModal';
import ViewSolicitudModal from './ViewSolicitudModal/ViewSolicitudModal';

const Modals: React.FC = () => {
  return (
    <Fragment>
      <AlertsModal />
      <ConfigModal />
      <NewPasswordModal />
      <ViewContactoModal />
      <ViewSolicitudModal />
    </Fragment>
  );
};

export default Modals;
