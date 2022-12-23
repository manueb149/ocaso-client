import { Table as TableAnt } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { verContactos } from '../../../slices/contacto.slice';
import { ITableParams } from '../../../slices/models/interfaces';
// import { setParams } from '../../../slices/table.slice';
import { IContacto } from '../../models/interfaces.model';
interface Props {}

// type DataIndex = keyof IContacto;

const TableContacto: React.FC<Props> = () => {
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef<InputRef>(null);

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
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      sorter: true,
      filterMultiple: false,
      filters: [
        { text: 'Masculino', value: 'M' },
        { text: 'Femenino', value: 'F' },
      ],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Es Empresa',
      dataIndex: 'empresa',
      key: 'empresa',
      sorter: true,
      filterMultiple: false,
      filters: [
        { text: 'Si', value: true },
        { text: 'No', value: false },
      ],
      width: '20%',
      render: (value) => (value ? 'Si' : 'No'),
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
