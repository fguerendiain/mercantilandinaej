import { CodeDescription, Coverage } from '../entities/General.model';

export interface UserData {
  dni: string;
  apellido: string;
  nombre: string;
  email?: string;
  celular?: string;
  telefono?: string;
  provincia: CodeDescription;
  ciudad: CodeDescription;
  domicilio: string;
  fechNac: Date;
  userName: string;
  password: string;
}

export interface UserVehicle {
  marca: CodeDescription;
  year: string;
  modelo: string;
  version?: CodeDescription;
}

export interface UserStateModel {
  usuario: UserData;
  vehiculo: UserVehicle;
  cobertura: Coverage;
}

