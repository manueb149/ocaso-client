// import { Dayjs } from 'dayjs';
import { FilterValue, Key, SorterResult, SortOrder, TablePaginationConfig } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';
import { Modules } from '../../src/models/enums.model';
import { IContacto } from '../../src/models/interfaces.model';
import { PaginatedResult } from '../../src/models/types.model';

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
    apellidos?: string;
    dob?: Dayjs | string | null;
    sexo?: string;
    eCivil?: string;
    tel?: string;
    cel: string;
    email?: string;
    empresa?: boolean;
    referencia?: string;
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
  contactos: PaginatedResult<IContacto>;
  suggestions: IContacto[];
  selectedContacto: IContacto | null;
  selectedIntermediario: IContacto | null;
  pagination?: TablePaginationConfig;
}

export interface ITableState {
  params: ITableParams;
  loading: boolean;
}
export type ContactoQuery = {
  limit: number;
  page: number;
  sortBy?: string;
};

export interface ITableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  sorter?: SorterResult<IContacto> | SorterResult<IContacto>[];
  order?: SortOrder;
  field?: Key | Key[];
  filters?: Record<string, FilterValue | null>;
}
