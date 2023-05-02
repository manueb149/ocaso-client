import { Button, Descriptions, Empty, Modal } from 'antd';
import { setViewSolicitudModal } from '../../../../slices/layout.slice';
import { AppDispatch, RootState } from '../../../../config/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { IDependientes } from '../../../models/interfaces.model';
import { ColumnsType } from 'antd/es/table';
import { DependientesOptions, SexoOptions } from '../../Dependientes/Dependientes';
import { Table as TableAnt } from 'antd';
require('dayjs/locale/es');

const ViewSolicitudModal: React.FC<{}> = () => {
  const { isViewSolicitudModalOpen } = useSelector((state: RootState) => state.layout);
  const { viewSolicitud } = useSelector((state: RootState) => state.solicitud);
  const desde = dayjs(viewSolicitud?.desde ?? '', 'DD/MM/YYYY').locale('es');
  const hasta = dayjs(viewSolicitud?.hasta ?? '', 'DD/MM/YYYY').locale('es');

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (status: boolean) => {
    dispatch(setViewSolicitudModal(status));
  };

  const handleClear = (status: boolean) => {
    dispatch(setViewSolicitudModal(status));
  };

  const columns: ColumnsType<IDependientes> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      width: '200px',
    },
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
      width: '120px',
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'dob',
      key: 'dob',
      width: '100px',
      render: (value) => value,
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      width: '100px',
      render: (value) => SexoOptions.find((item) => item.value === value)?.label,
    },
    {
      title: 'Parentezco',
      dataIndex: 'parentezco',
      key: 'parentezco',
      width: '130px',
      render: (value) => DependientesOptions.find((item) => item.value === value)?.label,
    },
  ];

  return (
    <span className="d-inline-block mb-2 mr-2">
      <Modal
        destroyOnClose
        centered
        title="Datos de la solicitud"
        open={isViewSolicitudModalOpen}
        onOk={() => handleClear(false)}
        onCancel={() => handleClose(false)}
        bodyStyle={{
          padding: '10px 20px 0px 10px',
          width: '100%',
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
        {viewSolicitud ? (
          <Descriptions layout="vertical" bordered size="small" column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}>
            {/* <Descriptions.Item label={<b>Nombre</b>} span={2}>
              {viewSolicitud. ?? ''} {viewContacto.apellidos ?? ''}
            </Descriptions.Item> */}
            <Descriptions.Item label={<b>Cédula</b>} span={3}>
              {viewSolicitud.contratante ?? ''}
            </Descriptions.Item>

            {/* {!viewContacto.empresa ? (
              <Descriptions.Item label={<b>Fecha de nacimiento</b>} span={1}>
                {viewContacto.dob
                  ? `${dayjs(dob, 'DD/MM/YYYY').format('dddd D')} DE ${dayjs(dob, 'DD/MM/YYYY').format(
                      'MMMM'
                    )} DEL ${dayjs(dob, 'DD/MM/YYYY').format('YYYY')}`.toUpperCase()
                  : ''}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label={<b>RNC</b>} span={1}>
                {viewContacto.rnc || ''}
              </Descriptions.Item>
            )} */}
            <Descriptions.Item label={<b>Plan</b>} span={3}>
              {viewSolicitud.plan.nombre ?? ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Prima</b>} span={3}>
              {viewSolicitud.plan.prima}
            </Descriptions.Item>

            <Descriptions.Item label={<b>Desde</b>} span={3}>
              {viewSolicitud.desde
                ? `${dayjs(desde, 'DD/MM/YYYY').format('dddd D')} DE ${dayjs(desde, 'DD/MM/YYYY').format(
                    'MMMM'
                  )} DEL ${dayjs(desde, 'DD/MM/YYYY').format('YYYY')}`.toUpperCase()
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Hasta</b>} span={3}>
              {viewSolicitud.hasta
                ? `${dayjs(hasta, 'DD/MM/YYYY').format('dddd D')} DE ${dayjs(hasta, 'DD/MM/YYYY').format(
                    'MMMM'
                  )} DEL ${dayjs(hasta, 'DD/MM/YYYY').format('YYYY')}`.toUpperCase()
                : ''}
            </Descriptions.Item>

            <Descriptions.Item label={<b>Dependientes inscritos</b>} span={3} style={{ whiteSpace: 'pre-line' }}>
              <TableAnt columns={columns} dataSource={viewSolicitud.inscritos} pagination={false} />
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty />
        )}
      </Modal>
    </span>
  );
};

export default ViewSolicitudModal;
