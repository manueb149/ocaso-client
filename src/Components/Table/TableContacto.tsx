import { Button, Input, InputRef, Space, Table as TableAnt } from 'antd';
import type { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { verContactos } from '../../../slices/contacto.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { IContacto } from '../../models/interfaces.model';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../ActionButton/ActionButton';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof IContacto;

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IContacto> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value.toUpperCase()] : [])}
          onPressEnter={() =>
            handleSearch([selectedKeys[0]?.toString().toUpperCase(), ...selectedKeys] as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined style={{ verticalAlign: 0 }} />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(String(dataIndex));
            }}
          >
            filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IContacto> = [
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      sorter: true,
      width: '15%',
      ...getColumnSearchProps('nombres'),
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      sorter: true,
      width: '15%',
      ...getColumnSearchProps('apellidos'),
    },
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
      width: '12%',
      ...getColumnSearchProps('cedula'),
      render: (value) => value || '',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    // {
    //   title: 'Sexo',
    //   dataIndex: 'sexo',
    //   key: 'sexo',
    //   align: 'center',
    //   sorter: true,
    //   filterMultiple: false,
    //   filters: [
    //     { text: 'Masculino', value: 'M' },
    //     { text: 'Femenino', value: 'F' },
    //     { text: 'Otro', value: 'O' },
    //   ],
    //   width: '10%',
    //   render: (value) => (value === 'M' ? 'Masculino' : value === 'F' ? 'Femenino' : 'Otro'),
    // },
    {
      title: 'Empresa',
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
      title: 'Vendedor',
      dataIndex: 'vendedor',
      key: 'vendedor',
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
            <ActionButton table="contactos" action="Ver" record={record} icon={faEye} />
            <ActionButton table="contactos" action="Editar" record={record} icon={faPenToSquare} />
            <ActionButton
              table="contactos"
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
        rowKey={(record) => record.cedula}
        dataSource={contactos.results}
        pagination={params.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ y: 520, x: 1000 }}
        size="small"
      />
    </>
  );
};

export default TableContacto;
