import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInstance, TablePaginationConfig } from 'antd';
import { signOut } from 'next-auth/react';
import { Notify } from '../config/notifications';
import { ISolicitudState, ITableParams } from './models/interfaces';
import qs from 'querystring';
import { ISolicitud } from '../src/models/interfaces.model';
import { getTableParams } from '../utils/getTableParams';
import { setTableLoading, setTableParams } from './table.slice';
import { PaginatedResult } from '../src/models/types.model';

const initialState: ISolicitudState = {
  solicitud: {
    plan: {
      nombre: '',
      valor: 0,
      prima: 0.0,
    },
    numDocumento: 0,
    contratante: '',
    vendedor: '',
    desde: null,
    hasta: null,
    vigencia: 0,
    inscritos: [],
    numSolicitud: 0,
    cobertura: [],
  },

  saving: false,
  solicitudes: {
    results: [],
    limit: 0,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  },
  suggestions: [],
  selectedSolicitud: null,
  selectedIntermediario: null,
};

export const verSolicitudes = createAsyncThunk(
  'SOLICTUD_REDUCERS/VER_SOLICITUDES',
  async (params: ITableParams | undefined, { dispatch }) => {
    try {
      dispatch(setTableLoading(true));
      const res = await fetch(`/api/solicitudes/ver?${qs.stringify(getTableParams(params))}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await res.json()) as { solicitudes: PaginatedResult<ISolicitud> };
      const pagination = {
        current: data?.solicitudes?.page ?? 1,
        pageSize: data?.solicitudes?.limit ?? 10,
        total: data?.solicitudes?.totalResults ?? 10,
      };
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/api/auth/logout`).then(() => signOut());
        } else {
          Notify('warn', `Error al cargar las solicitudes`);
        }
      } else {
        dispatch(setSolicitudes(data.solicitudes));
        dispatch(setTableParams({ pagination }));
        dispatch(setTableLoading(false));
      }
    } catch (error: any) {
      console.log('error', error);
    }
  }
);

export const guardarSolicitud = createAsyncThunk(
  'CONTACTO_REDUCERS/GUARDAR_SOLICITUD',
  async ({ form }: { form: FormInstance }) => {
    try {
      const res = await fetch(`/api/solicitudes/crear`, {
        method: 'POST',
        body: JSON.stringify({
          ...form.getFieldsValue(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/api/auth/logout`).then(() => signOut());
        } else {
          Notify('warn', `${data?.data?.message}`);
        }
      } else {
        Notify('success', `Solicitud creada`);
        form.resetFields();
      }
    } catch (error: any) {}
  }
);

const solicitudSlice = createSlice({
  name: 'solicitudes',
  initialState: initialState,
  reducers: {
    setSolicitud: (state, action: PayloadAction<ISolicitudState['solicitud']>) => {
      state.solicitud = { ...state.solicitud, ...action.payload };
    },
    setSolicitudes: (state, action: PayloadAction<PaginatedResult<ISolicitud>>) => {
      state.solicitudes = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
    clearSolicitud: (state) => {
      state.solicitud = {
        plan: {
          nombre: '',
          valor: 0,
          prima: 0.0,
        },
        numDocumento: 0,
        contratante: '',
        vendedor: '',
        desde: null,
        hasta: null,
        vigencia: 0,
        inscritos: [],
        numSolicitud: 0,
        cobertura: [],
      };
    },
    setSuggestions: (state, action: PayloadAction<ISolicitud[]>) => {
      state.suggestions = action.payload;
    },
    setPagination: (state, action: PayloadAction<TablePaginationConfig>) => {
      state.pagination = action.payload;
    },
  },
});

export const { setSolicitud, clearSolicitud, setSaving, setSolicitudes } = solicitudSlice.actions;

export default solicitudSlice.reducer;
