import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { signOut } from 'next-auth/react';
import { RootState } from '../config/configureStore';
import { Notify } from '../config/notifications';
import { IContactoState } from './models/interfaces';

const initialState: IContactoState = {
  contacto: {
    cedula: '',
    rnc: 0,
    nombres: '',
    apellidos: '',
    dob: null,
    sexo: '',
    tel: '',
    cel: '',
    email: '',
    direccion: {
      calle: '',
      sector: '',
      municipio: {
        codigo: '',
        nombre: '',
      },
      provincia: {
        codigo: '',
        nombre: '',
      },
      region: {
        codigo: '',
        nombre: '',
      },
      pais: {
        codigo: '',
        nombre: '',
      },
    },
  },
  saving: false,
};

export const guardarContacto = createAsyncThunk(
  'CONTACTO_REDUCERS/GUARDAR_CONTACTO',
  async (form: FormInstance, thunkAPI) => {
    try {
      const { contacto } = (thunkAPI.getState() as RootState).contacto;
      const res = await fetch(`/api/contactos/crear`, {
        method: 'POST',
        body: JSON.stringify({
          ...contacto,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          fetch(`/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
              refreshToken: data ? data.user?.refreshToken : null,
            }),
          }).then(() => signOut());
        } else {
          Notify('warn', `${data?.data?.message}`);
        }
      } else {
        Notify('success', `Contacto: ${contacto.nombres} ${contacto.apellidos} creado`);
        form.resetFields();
      }
    } catch (error: any) {}
  }
);

const contactoSlice = createSlice({
  name: 'contacto',
  initialState: initialState,
  reducers: {
    setContacto: (state, action: PayloadAction<IContactoState['contacto']>) => {
      state.contacto = { ...state.contacto, ...action.payload };
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
    clearContacto: (state) => {
      state.contacto = {
        cedula: '',
        nombres: '',
        apellidos: '',
        dob: null,
        sexo: '',
        tel: '',
        cel: '',
        email: '',
        direccion: {
          calle: '',
          sector: '',
          municipio: {
            codigo: '',
            nombre: '',
          },
          provincia: {
            codigo: '',
            nombre: '',
          },
          region: {
            codigo: '',
            nombre: '',
          },
          pais: {
            codigo: '',
            nombre: '',
          },
        },
      };
    },
  },
});

export const { setContacto, clearContacto, setSaving } = contactoSlice.actions;

export default contactoSlice.reducer;
