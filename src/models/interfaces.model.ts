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
  contacto: IContacto;
  plan: IPlan;
  intermediario: IResponsable;
  desde: Date;
  hasta: Date;
  vigencia: number;
  inscritos: IDependientes[];
  totalCobertura: number;
  cobertura: ICobertura[];
}

export interface IPlan {
  tipo: string;
  valor: number;
  prima: number;
}

export interface ICobertura {
  nombre: string;
  desc: string;
  status: boolean;
}

export interface IDependientes {
  cedula: string;
  nombre: string;
  apellidos: string;
  dob: Date;
  sexo: string;
  parentezco: string;
  prima: number;
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
}
