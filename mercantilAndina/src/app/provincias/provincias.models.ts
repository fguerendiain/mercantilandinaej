import { CodeDescription } from '../entities/General.model';

export interface ProvinciasStateModel {
  provincias: CodeDescription[];
  municipios?: CodeDescription[];
}
