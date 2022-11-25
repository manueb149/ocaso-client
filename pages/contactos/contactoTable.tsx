import { Table } from 'antd';
import type {
  ColumnsType,
  FilterValue,
  Key,
  SorterResult,
  SortOrder,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../config/configureStore';
import { verContactos } from '../../slices/contacto.slice';
import { IContacto } from '../../src/models/interfaces.model';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  order?: SortOrder;
  field?: Key | readonly Key[];
  filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<IContacto> = [
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Sexo',
    dataIndex: 'sexo',
    filterMultiple: false,
    filters: [
      { text: 'Male', value: 'M' },
      { text: 'Female', value: 'F' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const getContactoParams = (params: TableParams) => {
  if (params?.filters?.sexo) {
    return {
      limit: params.pagination?.pageSize ?? 10,
      page: params.pagination?.current ?? 1,
      sortBy: `${params.field}:${params.order?.substring(0, 4)}`,
      sexo: !!params.filters?.sexo ? `${params.filters?.sexo![0]}` : undefined,
    };
  }
  return {
    limit: params.pagination?.pageSize ?? 10,
    page: params.pagination?.current ?? 1,
    sortBy: `${params.field}:${params.order?.substring(0, 4)}`,
  };
};

const ContactoTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
    },
  });
  const { contactos } = useSelector((state: RootState) => state.contacto);
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = () => {
    setLoading(true);
    console.log(tableParams);
    dispatch(verContactos(getContactoParams(tableParams)));
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: contactos.totalResults,
        // total:200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams)]);
  
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IContacto> | SorterResult<IContacto>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.cedula}
        dataSource={contactos.results}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ContactoTable;
