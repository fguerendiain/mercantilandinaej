import { Coverage } from '../entities/General.model';

export interface UserData {
  dni: string;
  apellido: string;
  nombre: string;
  email?: string;
  celular?: string;
  telefono?: string;
  provincia: string;
  ciudad: string;
  domicilio: string;
  fechNac: Date;
  userName: string;
  password: string;
}

export interface UserVehicle {
  marca: string;
  year: string;
  modelo: string;
  version?: string;
}

export interface UserStateModel {
  usuario: UserData;
  vehiculo: UserVehicle;
  covertura: Coverage;
}
