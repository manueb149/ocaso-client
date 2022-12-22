import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITableState } from './models/interfaces';

const initialState: ITableState = {
  params: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
      showSizeChanger: true,
    },
  },
  loading: false,
};

const tableSlice = createSlice({
  name: 'table',
  initialState: initialState,
  reducers: {
    setTableParams: (state, action: PayloadAction<ITableState['params']>) => {
      state.params = {
        ...state.params,
        pagination: {
          ...state.params.pagination,
          ...action.payload.pagination,
        },
      };
    },
    setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTableParams, setTableLoading } = tableSlice.actions;

export default tableSlice.reducer;
