import { FilterValue, Key, SorterResult, SortOrder, TablePaginationConfig } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';
import { Modules } from '../../src/models/enums.model';
import { IContacto, ISolicitud } from '../../src/models/interfaces.model';
import { PaginatedResult } from '../../src/models/types.model';

export interface ILayoutState {
  isSidebarClosed: boolean;
  isMainSectionLoading: boolean;
  selectedModule: Modules;
  isAlertsModalOpen: boolean;
  isConfigModalOpen: boolean;
  isNewPasswordModalOpen: boolean;
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

export interface ISolicitudState {
  solicitud: {
    plan?: {
      nombre: string;
      valor: number;
      prima: number;
    };
    numDocumento?: number;
    contratante?: string;
    vendedor?: string;
    desde?: Dayjs | string | null;
    hasta?: Dayjs | string | null;
    vigencia?: number;
    inscritos?: [];
    numSolicitud?: number;
    cobertura?: [];
  };
  saving: boolean;
  solicitudes: PaginatedResult<ISolicitud>;
  suggestions: ISolicitud[];
  selectedSolicitud: ISolicitud | null;
  selectedIntermediario: IContacto | null;
  pagination?: TablePaginationConfig;
}

export interface ITableState {
  params: ITableParams;
  loading: boolean;
}

export type TableQuery = {
  limit: number;
  page: number;
  sortBy?: string;
};

export interface ITableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  sorter?: SorterResult<any> | SorterResult<any>[];
  order?: SortOrder;
  field?: Key | Key[];
  filters?: Record<string, FilterValue | null>;
}
