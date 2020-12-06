import { CodeDescription } from '../entities/General.model';

export interface VehicleStateModel{
  marcas: CodeDescription[];
  years?: string[];
  modelos?: string[];
  versiones?: CodeDescription[];
}
