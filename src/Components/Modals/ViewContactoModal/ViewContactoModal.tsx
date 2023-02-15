import { Badge, Button, Descriptions, Empty, Modal } from 'antd';
import { setViewContactoModal } from '../../../../slices/layout.slice';
import { AppDispatch, RootState } from '../../../../config/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
require('dayjs/locale/es');

const ViewContactoModal: React.FC<{}> = () => {
  const { isViewContactoModalOpen } = useSelector((state: RootState) => state.layout);
  const { viewContacto } = useSelector((state: RootState) => state.contacto);
  const dob = dayjs(viewContacto?.dob ?? '', 'DD/MM/YYYY').locale('es');

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (status: boolean) => {
    dispatch(setViewContactoModal(status));
  };

  const handleClear = (status: boolean) => {
    dispatch(setViewContactoModal(status));
  };

  const sexoText = (option: string | undefined) => {
    switch (option) {
      case 'M':
        return 'MASCULINO';
      case 'F':
        return 'FEMENINO';
      case 'O':
        return 'OTRO';
      default:
        return '';
    }
  };

  return (
    <span className="d-inline-block mb-2 mr-2">
      <Modal
        destroyOnClose
        centered
        title="Datos del contacto"
        open={isViewContactoModalOpen}
        onOk={() => handleClear(false)}
        onCancel={() => handleClose(false)}
        bodyStyle={{
          padding: '10px 20px 0px 10px',
          height: '70vh',
          overflowX: 'auto',
        }}
        width={'60vw'}
        footer={[
          <Button key="back" onClick={() => handleClose(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {viewContacto ? (
          <Descriptions layout="vertical" bordered size="small" column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}>
            <Descriptions.Item label={<b>Nombre</b>} span={2}>
              {viewContacto.nombres ?? ''} {viewContacto.apellidos ?? ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Cédula</b>} span={1}>
              {viewContacto.cedula ?? ''}
            </Descriptions.Item>

            {!viewContacto.empresa ? (
              <Descriptions.Item label={<b>Fecha de nacimiento</b>} span={1}>
                {viewContacto.dob
                  ? `${dob.format('dddd D')} DE ${dob.format('MMMM')} DEL ${dob.format('YYYY')}`.toUpperCase()
                  : ''}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label={<b>RNC</b>} span={1}>
                {viewContacto.rnc || ''}
              </Descriptions.Item>
            )}
            <Descriptions.Item label={<b>Estado civil</b>} span={1}>
              {viewContacto.eCivil ?? ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Sexo</b>} span={1}>
              {sexoText(viewContacto.sexo)}
            </Descriptions.Item>

            <Descriptions.Item label={<b>Celular</b>} span={1}>
              {viewContacto.cel ?? ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Teléfono</b>} span={1}>
              {viewContacto.tel ?? ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Correo Electrónico</b>} span={1}>
              {viewContacto.email ?? ''}
            </Descriptions.Item>

            <Descriptions.Item label={<b>Es empresa(a)</b>} span={1}>
              {viewContacto.empresa ? 'Si' : 'No'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Es vendedor(a)</b>} span={1}>
              {viewContacto.vendedor ? 'Si' : 'No'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Estado</b>} span={1}>
              {Number(viewContacto.status) === 1 ? (
                <Badge status="success" text="Activo" />
              ) : (
                <Badge status="error" text="Inactivo" />
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<b>Dirección</b>} span={3} style={{ whiteSpace: 'pre-line' }}>
              <b>Calle: </b> {viewContacto.direccion.calle ?? ''} {'\n '}
              <b>Sector: </b> {viewContacto.direccion.sector ?? ''} {'\n '}
              <b>Municipio: </b> {viewContacto.direccion.municipio?.nombre ?? ''} {'\n '}
              <b>Provincia: </b> {viewContacto.direccion.provincia?.nombre ?? ''} {'\n '}
              <b>Region: </b> {viewContacto.direccion.region?.nombre ?? ''} {'\n '}
              <b>País: </b> {viewContacto.direccion.pais?.nombre ?? ''} {'\n '} {'\n '}
              <b>Referencia: </b> {viewContacto.direccion.referencia ?? ''}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty />
        )}
      </Modal>
    </span>
  );
};

export default ViewContactoModal;
