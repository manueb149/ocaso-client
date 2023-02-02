import { Badge, Button, Card, Empty, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../config/configureStore';
import { setToggleAlertsModal } from '../../../../slices/layout.slice';

const AlertsModal: React.FC = () => {
  const { isAlertsModalOpen } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  const getBadgeColor = (alarmType: string) => {
    switch (alarmType) {
      case 'MA':
        return 'green';
      case 'MI':
        return 'red';
      case 'MC':
        return 'green';
      case 'MSC':
        return 'red';
      case 'SD':
        return 'yellow';
      case 'LM':
        return 'cyan';
      default:
        return 'primary';
    }
  };

  const handleClose = (status: boolean) => {
    dispatch(setToggleAlertsModal(status));
  };

  const handleClear = (status: boolean) => {
    dispatch(setToggleAlertsModal(status));
    // dispatch(clearAlerts());
  };

  return (
    <Modal
      destroyOnClose
      centered
      title="Alertas"
      open={isAlertsModalOpen}
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
          Limpiar
        </Button>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: [].length > 0 ? 'flex-start' : 'center',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        {[].length > 0 ? (
          [].map((alert) => (
            <Badge.Ribbon
              key={`${Object.values(alert).join(',') + Math.floor(Math.random() * 1000000)}`}
              text={'Alerta de ' + ''}
              color={getBadgeColor('')}
            >
              <Card
                title={'Máquina ' + ''}
                size="small"
                style={{
                  marginBottom: '10px',
                  boxShadow: `0px 0px 2px 0px gray`,
                }}
              ></Card>
            </Badge.Ribbon>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Modal>
  );
};

export default AlertsModal;
