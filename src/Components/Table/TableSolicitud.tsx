import { Space, Table as TableAnt } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { verSolicitudes } from '../../../slices/solicitud.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { ISolicitud } from '../../models/interfaces.model';
import ActionButton from '../ActionButton/ActionButton';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
require('dayjs/locale/es');

interface Props {}

const TableSolicitud: React.FC<Props> = () => {
  const { solicitudes } = useSelector((state: RootState) => state.solicitud);
  const { params, loading } = useSelector((state: RootState) => state.table);

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = (params?: ITableParams) => {
    dispatch(verSolicitudes(params));
  };

  const handleTableChange = (
    pagination: ITableParams['pagination'],
    filters: ITableParams['filters'],
    sorter: ITableParams['sorter']
  ) => {
    fetchData({ pagination, filters, sorter });
  };

  const columns: ColumnsType<ISolicitud> = [
    {
      title: 'No. Solicitud',
      dataIndex: 'numSolicitud',
      key: 'numSolicitud',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Contratante',
      dataIndex: 'contratante',
      key: 'contratante',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Vendedor',
      dataIndex: 'vendedor',
      key: 'vendedor',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Desde',
      dataIndex: 'desde',
      key: 'desde',
      render: (text) => <>{dayjs(text, 'DD/MM/YYYY').format('DD/MM/YYYY')}</>,
    },
    {
      title: 'Hasta',
      dataIndex: 'hasta',
      key: 'hasta',
      render: (text) => <>{dayjs(text, 'DD/MM/YYYY').format('DD/MM/YYYY')}</>,
    },
    {
      title: 'Acciones',
      width: '10%',
      align: 'center',
      render: (record) => (
        <div>
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <ActionButton table="solicitudes" action="Ver" record={record} icon={faEye} />
            <ActionButton table="solicitudes" action="Editar" record={record} icon={faPenToSquare} />
            <ActionButton
              table="solicitudes"
              action="Eliminar"
              record={record}
              title="Eliminar contacto"
              icon={faTrash}
              confirmModal
              danger
            />
          </Space>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableAnt
        columns={columns}
        rowKey={(record) => record.numSolicitud + ''}
        dataSource={solicitudes.results}
        pagination={params.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ y: 520, x: 1000 }}
        size="small"
      />
    </>
  );
};

export default TableSolicitud;
