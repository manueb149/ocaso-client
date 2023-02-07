import { Button, Space, Table as TableAnt, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { verContactos } from '../../../slices/contacto.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { IContacto } from '../../models/interfaces.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const TableContacto: React.FC<Props> = () => {
  const { contactos } = useSelector((state: RootState) => state.contacto);
  const { params, loading } = useSelector((state: RootState) => state.table);

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = (params?: ITableParams) => {
    dispatch(verContactos(params));
  };

  const handleTableChange = (
    pagination: ITableParams['pagination'],
    filters: ITableParams['filters'],
    sorter: ITableParams['sorter']
  ) => {
    fetchData({ pagination, filters, sorter });
  };

  const columns: ColumnsType<IContacto> = [
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      align: 'center',
      sorter: true,
      filterMultiple: false,
      filters: [
        { text: 'Masculino', value: 'M' },
        { text: 'Femenino', value: 'F' },
        { text: 'Otro', value: 'O' },
      ],
      width: '10%',
      render: (value) => (value === 'M' ? 'Masculino' : value === 'F' ? 'Femenino' : 'Otro'),
    },
    {
      title: 'Es Empresa',
      dataIndex: 'empresa',
      key: 'empresa',
      align: 'center',
      sorter: true,
      filterMultiple: false,
      filters: [
        { text: 'Si', value: true },
        { text: 'No', value: false },
      ],
      width: '10%',
      render: (value) => (value ? 'Si' : 'No'),
    },
    {
      title: 'Acciones',
      width: '10%',
      align: 'center',
      render: (record) => (
        <div>
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Tooltip title="Ver">
              <Button
                shape="circle"
                style={{ margin: 0, padding: '0' }}
                onClick={() => {
                  console.log(record);
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Tooltip>
            <Tooltip title="Editar">
              <Button shape="circle" style={{ margin: 0, padding: '0' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button shape="circle" style={{ margin: 0, padding: '0' }} danger>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Tooltip>
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
        rowKey={(record) => record.cedula}
        dataSource={contactos.results}
        pagination={params.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default TableContacto;
