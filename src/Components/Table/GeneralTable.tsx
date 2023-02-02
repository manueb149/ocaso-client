import { Table as TableAnt } from 'antd';
import type { ColumnsType, GetRowKey } from 'antd/es/table/interface';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { ITableParams } from '../../../slices/models/interfaces';

// interface T extends Record<string, any> {}
interface Props<T> {
  columns: ColumnsType<T>;
  data: T[];
  getValues: any;
  rowKey: GetRowKey<T>;
}

const GeneralTable = <T extends object>({ columns, data, getValues, rowKey }: Props<T>) => {
  const { params, loading } = useSelector((state: RootState) => state.table);

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = (params?: ITableParams) => {
    dispatch(getValues(params));
  };

  const handleTableChange = (
    pagination: ITableParams['pagination'],
    filters: ITableParams['filters'],
    sorter: ITableParams['sorter']
  ) => {
    fetchData({ pagination, filters, sorter });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableAnt
        columns={columns}
        rowKey={rowKey}
        dataSource={data}
        pagination={params.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default GeneralTable;
