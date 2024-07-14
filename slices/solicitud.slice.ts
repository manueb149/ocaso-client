import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInstance, TablePaginationConfig } from 'antd';
import { signOut } from 'next-auth/react';
import { Notify } from '../config/notifications';
import { ISolicitudState, ITableParams } from './models/interfaces';
import qs from 'querystring';
import { IContacto, ISolicitud } from '../src/models/interfaces.model';
import { getTableParams } from '../utils/getTableParams';
import { setTableLoading, setTableParams } from './table.slice';
import { PaginatedResult } from '../src/models/types.model';

const initialState: ISolicitudState = {
  solicitud: {
    plan: {
      nombre: '',
      valor: 0,
      prima: 0.0,
      pago: '',
    },
    tipoPlan: '',
    numDocumento: 0,
    contratante: '',
    vendedor: '',
    desde: '',
    hasta: '',
    vigencia: 0,
    inscritos: [],
    numSolicitud: 0,
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
  viewSolicitud: null,
  editSolicitud: null,
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
      const contactos = await fetch(`/api/contactos/ver?limit=1000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dataContactos = (await contactos.json()) as { contactos: PaginatedResult<IContacto> };
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
          dispatch(setTableLoading(false));
        }
      } else {
        const solicitudes: PaginatedResult<ISolicitud> = {
          ...data.solicitudes,
          results: data.solicitudes.results.map((solicitud) => {
            const contacto = dataContactos.contactos.results.filter((item) => item.cedula === solicitud.contratante);
            const vendedor = dataContactos.contactos.results.filter((item) => item.cedula === solicitud.vendedor);
            return {
              ...solicitud,
              titular: `${contacto[0]?.nombres} ${contacto[0]?.apellidos}`,
              nombreVendedor: `${vendedor[0]?.nombres} ${vendedor[0]?.apellidos}`,
            };
          }),
        };

        dispatch(setSolicitudes(solicitudes));
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
  async ({
    solicitud,
    formContratante,
    formDependientes,
    setCurrent,
  }: {
    solicitud: ISolicitud;
    formContratante: FormInstance;
    formDependientes: FormInstance;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    try {
      console.log(solicitud);
      setSaving(true);
      const res = await fetch(`/api/solicitudes/crear`, {
        method: 'POST',
        body: JSON.stringify(solicitud),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/api/auth/logout`).then(() => signOut());
        } else {
          console.log(data?.solicitudes?.message);
          Notify('warn', `${data?.solicitudes?.message}`);
        }
      } else {
        console.log(data?.solicitudes?.numSolicitud);
        Notify('success', `Solicitud #${data?.solicitudes?.numSolicitud} guardada!'`, 5000);
        formContratante.resetFields();
        formDependientes.resetFields();
        setSaving(false);
        setCurrent(0);
      }
    } catch (error: any) {
      setSaving(false);
      formContratante.resetFields();
      formDependientes.resetFields();
      setSaving(false);
      setCurrent(0);
    }
  }
);

export const editarSolicitud = createAsyncThunk(
  'CONTACTO_REDUCERS/EDITAR_SOLICITUD',
  async ({
    solicitud,
    formContratante,
    formDependientes,
    setCurrent,
  }: {
    solicitud: ISolicitud;
    formContratante: FormInstance;
    formDependientes: FormInstance;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    try {
      console.log(solicitud);
      setSaving(true);
      const res = await fetch(`/api/solicitudes/editar`, {
        method: 'POST',
        body: JSON.stringify(solicitud),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/api/auth/logout`).then(() => signOut());
        } else {
          console.log(data?.solicitudes?.message);
          Notify('warn', `${data?.solicitudes?.message}`);
        }
      } else {
        console.log(data?.solicitudes?.numSolicitud);
        Notify('success', `Solicitud #${data?.solicitudes?.numSolicitud} guardada!'`, 5000);
        formContratante.resetFields();
        formDependientes.resetFields();
        setSaving(false);
        setCurrent(0);
      }
    } catch (error: any) {
      setSaving(false);
      formContratante.resetFields();
      formDependientes.resetFields();
      setSaving(false);
      setCurrent(0);
    }
  }
);

const solicitudSlice = createSlice({
  name: 'solicitudes',
  initialState: initialState,
  reducers: {
    setSolicitud: (state, action: PayloadAction<ISolicitudState['solicitud']>) => {
      state.solicitud = { ...state.solicitud, ...action.payload };
    },
    setViewSolicitud: (state, action: PayloadAction<ISolicitud | null>) => {
      state.viewSolicitud = action.payload;
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
          pago: '0',
          prima: 0.0,
        },
        tipoPlan: '',
        numDocumento: 0,
        contratante: '',
        vendedor: '',
        desde: '',
        hasta: '',
        vigencia: 0,
        inscritos: [],
        numSolicitud: 0,
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

export const { setSolicitud, clearSolicitud, setSaving, setSolicitudes, setViewSolicitud } = solicitudSlice.actions;

export default solicitudSlice.reducer;
