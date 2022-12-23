import { Table as TableAnt } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { verSolicitudes } from '../../../slices/solicitud.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { ISolicitud } from '../../models/interfaces.model';
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
    { title: 'Desde', dataIndex: 'desde', key: 'desde' },
    { title: 'Hasta', dataIndex: 'hasta', key: 'hasta' },
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
      />
    </>
  );
};

export default TableSolicitud;
