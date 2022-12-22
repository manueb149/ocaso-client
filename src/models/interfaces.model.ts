import { Dayjs } from 'dayjs';

export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface ILoginForm {
  email: string;
  password: string;
}

// SOLICITUD
export interface ISolicitud {
  numSolicitud?: number;
  numDocumento?: number;
  contratante: IContacto['cedula'];
  vendedor: IContacto['cedula'];
  plan: Plan;
  desde: Date;
  hasta: Date;
  vigencia: number;
  inscritos: IDependientes[];
  totalCobertura?: number;
}

export type Plan = {
  nombre: string;
  valor: number;
  prima: number;
};

export interface IDependientes {
  cedula?: string;
  nombre: string;
  dob: Date | string | Dayjs;
  sexo: string;
  parentezco: string;
}

export interface IResponsable {
  cedula: string;
  nombres: string;
  apellidos: string;
  direccion: IDireccion;
  email: string;
}

// CONTACTO
export interface IContacto {
  cedula: string;
  rnc?: number;
  nombres: string;
  apellidos: string;
  direccion: IDireccion;
  dob: string;
  sexo: string;
  eCivil?: string;
  tel?: string;
  cel: string;
  email?: string;
}

export interface IDireccion {
  calle: string;
  sector: string;
  zip?: string;
  municipio: {
    codigo: string;
    nombre?: string;
  };
  provincia: {
    codigo: string;
    nombre?: string;
  };
  region: {
    codigo: string;
    nombre?: string;
  };
  pais: {
    codigo: string;
    nombre?: string;
  };
}

// PLANES
export interface IPlan {
  id: string;
  nombre: string;
  valor: number[];
  prima: number[];
}
