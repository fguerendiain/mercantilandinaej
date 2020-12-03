import { CodeDescription } from '../entities/General.model';

export interface VehicleStateModel{
  marcas: CodeDescription[];
  modelos?: string[];
  versiones?: CodeDescription[];
}
