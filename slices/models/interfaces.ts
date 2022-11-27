// import { Dayjs } from 'dayjs';
import { Dayjs } from 'dayjs';
import { Modules } from '../../src/models/enums.model';
import { IContacto } from '../../src/models/interfaces.model';

export interface ILayoutState {
  isSidebarClosed: boolean;
  isMainSectionLoading: boolean;
  selectedModule: Modules;
}

export interface IContactoState {
  contacto: {
    cedula: string;
    rnc?: number;
    nombres: string;
    apellidos: string;
    dob: Dayjs | string | null;
    sexo: string;
    eCivil?: string;
    tel?: string;
    cel: string;
    email?: string;
    direccion: {
      calle: String;
      sector: String;
      zip?: String;
      municipio: {
        codigo: String;
        nombre?: String;
      };
      provincia: {
        codigo: String;
        nombre?: String;
      };
      region: {
        codigo: String;
        nombre?: String;
      };
      pais: {
        codigo: String;
        nombre?: String;
      };
    };
  };
  saving: boolean;
  contactos: ContactoQueryResult;
}

export type ContactoQueryResult = {
  results: IContacto[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
