import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInstance, TablePaginationConfig } from 'antd';
import { signOut } from 'next-auth/react';
import { RootState } from '../config/configureStore';
import { Notify } from '../config/notifications';
import { IContactoState, ITableParams } from './models/interfaces';
import qs from 'querystring';
import { IContacto } from '../src/models/interfaces.model';
import { getTableParams } from '../utils/getTableParams';
import { setTableLoading, setTableParams } from './table.slice';
import { Dispatch, SetStateAction } from 'react';
import { PaginatedResult } from '../src/models/types.model';

const initialState: IContactoState = {
  contacto: {
    id: '',
    cedula: '',
    rnc: undefined,
    nombres: '',
    apellidos: '',
    dob: undefined,
    sexo: undefined,
    tel: '',
    cel: '',
    email: '',
    empresa: false,
    vendedor: false,
    direccion: {
      pais: {
        nombre: undefined,
      },
    },
  },
  saving: false,
  contactos: {
    results: [],
    limit: 0,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  },
  suggestions: [],
  viewContacto: null,
  editContacto: null,
  selectedContacto: null,
  selectedIntermediario: null,
  vendedor: false,
};

export const verContactos = createAsyncThunk(
  'CONTACTO_REDUCERS/VER_CONTACTOS',
  async (params: ITableParams | undefined, { dispatch, getState }) => {
    try {
      const { vendedor } = (getState() as RootState).contacto;
      const vendedorFilter = vendedor ? 'vendedor=true&' : 'vendedor=false&';
      dispatch(setTableLoading(true));
      const res = await fetch(`/api/contactos/ver?${vendedorFilter}${qs.stringify(getTableParams(params))}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await res.json()) as { contactos: PaginatedResult<IContacto> };
      const pagination = {
        current: data?.contactos?.page ?? 1,
        pageSize: data?.contactos?.limit ?? 10,
        total: data?.contactos?.totalResults ?? 10,
      };
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/api/auth/logout`).then(() => signOut());
        } else {
          Notify('warn', `Error al cargar los contactos`);
          dispatch(setTableLoading(false));
        }
      } else {
        const activeContactos = data.contactos.results.filter((contacto) => contacto.status);
        dispatch(
          setContactos({
            ...data.contactos,
            results: activeContactos,
          })
        );
        dispatch(setTableParams({ pagination }));
        dispatch(setTableLoading(false));
      }
    } catch (error: any) {}
  }
);

export const guardarContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/GUARDAR_CONTACTO',
  async (
    {
      contacto,
      form,
      setEmpresaChecked,
      setVendedorChecked,
    }: {
      contacto: IContacto;
      form: FormInstance<IContacto>;
      setEmpresaChecked: Dispatch<SetStateAction<boolean>>;
      setVendedorChecked: Dispatch<SetStateAction<boolean>>;
    },
    { dispatch }
  ) => {
    try {
      const res = await fetch(`/api/contactos/crear`, {
        method: 'POST',
        body: JSON.stringify(contacto),
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
        Notify('success', `Contacto creado`);
        dispatch(clearContacto());
        form.resetFields();
        setTimeout(() => {
          form.resetFields();
        }, 500);
        setEmpresaChecked(false);
        setVendedorChecked(false);
      }
    } catch (error: any) {}
  }
);

export const editarContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/EDITAR_CONTACTO',
  async (
    {
      contacto,
      form,
    }: {
      contacto: IContacto;
      form: FormInstance<IContacto>;
      setEmpresaChecked?: Dispatch<SetStateAction<boolean>>;
      setVendedorChecked?: Dispatch<SetStateAction<boolean>>;
    },
    { dispatch }
  ) => {
    try {
      console.log(contacto, form.getFieldsValue());
      const res = await fetch(`/api/contactos/editar`, {
        method: 'PATCH',
        body: JSON.stringify(contacto),
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
        Notify('success', `Contacto editado`);
      }
    } catch (error: any) {}
  }
);

export const eliminarContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/ELIMINAR_CONTACTO',
  async ({ id, fetchData }: { id: string; fetchData: () => void }) => {
    try {
      const res = await fetch(`/api/contactos/eliminar`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
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
        Notify('success', `${data?.data?.message}`);
        fetchData();
      }
    } catch (error: any) {}
  }
);

export const suggestContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/SUGGEST_CONTACTO',
  async (cedula: string, { dispatch }) => {
    try {
      const res = await fetch(`/api/contactos/suggest`, {
        method: 'POST',
        body: JSON.stringify(cedula),
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
        const suggestions = (data.data.suggestions as IContacto[]).filter((contacto) => contacto.status);
        dispatch(setSuggestions(suggestions));
      }
    } catch (error: any) {}
  }
);

export const selectContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/SELECTED_CONTACTO',
  ({ cedula, type }: { cedula: string | null; type: 'Contratante' | 'Vendedor' }, { dispatch, getState }) => {
    const { suggestions } = (getState() as RootState).contacto;
    const contacto = suggestions.find((contacto) => contacto.cedula === cedula);
    if (type === 'Contratante') {
      dispatch(setSelectedContacto(contacto ?? null));
    } else {
      dispatch(setSelectedIntermediario(contacto ?? null));
    }
  }
);

const contactoSlice = createSlice({
  name: 'contacto',
  initialState: initialState,
  reducers: {
    setContacto: (state, action: PayloadAction<IContacto>) => {
      state.contacto = { ...action.payload };
      localStorage.setItem('contactoForm', JSON.stringify({ ...action.payload }));
    },
    setContactos: (state, action: PayloadAction<PaginatedResult<IContacto>>) => {
      state.contactos = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
    clearContacto: (state) => {
      state.contacto = {
        cedula: '',
        rnc: undefined,
        nombres: '',
        apellidos: '',
        dob: undefined,
        sexo: undefined,
        eCivil: undefined,
        tel: '',
        cel: '',
        email: '',
        empresa: false,
        vendedor: false,
        direccion: {
          pais: {
            nombre: undefined,
          },
        },
      };
      localStorage.removeItem('contactoForm');
    },
    clearEditContacto: (state) => {
      state.editContacto = null;
    },
    setSuggestions: (state, action: PayloadAction<IContacto[]>) => {
      state.suggestions = action.payload;
    },
    setViewContacto: (state, action: PayloadAction<IContacto | null>) => {
      state.viewContacto = action.payload;
    },
    setEditContacto: (state, action: PayloadAction<IContacto | null>) => {
      state.editContacto = action.payload;
    },
    setSelectedContacto: (state, action: PayloadAction<IContacto | null>) => {
      state.selectedContacto = action.payload;
    },
    setSelectedIntermediario: (state, action: PayloadAction<IContacto | null>) => {
      state.selectedIntermediario = action.payload;
    },
    setPagination: (state, action: PayloadAction<TablePaginationConfig>) => {
      state.pagination = action.payload;
    },
    setVendedor: (state, action: PayloadAction<boolean>) => {
      state.vendedor = action.payload;
    },
  },
});

export const {
  setContacto,
  clearContacto,
  clearEditContacto,
  setSaving,
  setContactos,
  setSuggestions,
  setViewContacto,
  setEditContacto,
  setSelectedContacto,
  setSelectedIntermediario,
  setVendedor,
} = contactoSlice.actions;

export default contactoSlice.reducer;
