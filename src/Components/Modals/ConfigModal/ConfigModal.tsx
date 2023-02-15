import { Button, Modal } from 'antd';
import { setToggleConfigModal } from '../../../../slices/layout.slice';
import { AppDispatch, RootState } from '../../../../config/configureStore';
import { useDispatch, useSelector } from 'react-redux';

const ConfigModal: React.FC<{}> = () => {
  const { isConfigModalOpen } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (status: boolean) => {
    dispatch(setToggleConfigModal(status));
  };

  const handleClear = (status: boolean) => {
    dispatch(setToggleConfigModal(status));
  };

  return (
    <span className="d-inline-block mb-2 mr-2">
      <Modal
        destroyOnClose
        centered
        title="Configuracion de usuario"
        open={isConfigModalOpen}
        onOk={() => handleClear(false)}
        onCancel={() => handleClose(false)}
        bodyStyle={{
          padding: '10px 20px 0px 10px',
          width: '100%',
          height: '70vh',
          overflowX: 'auto',
        }}
        footer={[
          <Button key="back" onClick={() => handleClose(false)}>
            Cerrar
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleClear(false)}>
            Guardar
          </Button>,
        ]}
      ></Modal>
    </span>
  );
};

export default ConfigModal;
