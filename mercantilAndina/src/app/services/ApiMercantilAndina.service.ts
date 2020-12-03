import {HttpClient} from '@angular/common/http';
import * as messages from '../../messages';
import { CodeDescription } from '../entities/General.model';

const BASE_API = 'https://servicios.qamercantilandina.com.ar/api/v1';

export class ApiMercantilAndinaService {

  constructor(private http: HttpClient){}

  async getCarBrands(): Promise<CodeDescription[]>{
    try{
      const path = '/vehiculos/marcas';
      const wrapper: CodeDescription[] = await this.http.get<CodeDescription[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.get('ErrorGetVehicleBrands'));
    }
  }

  async getCarModels(code: string, year: string): Promise<string[]>{
    if (!code){throw new Error(messages.get('ErrorCarModelCode')); }
    try{
      const path = `/vehiculos/marcas/${code}/${year}`;
      const wrapper: string[] = await this.http.get<string[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.get('ErrorGetVehicleModels'));
    }
  }

  async getCarVersion(code: string, year: string, model: string): Promise<CodeDescription[]>{
    if (!code){throw new Error(messages.get('ErrorCarModelCode')); }
    if (!model){throw new Error(messages.get('ErrorCarModelModel')); }
    try{
      const path = `/vehiculos/marcas/${code}/${year}/${model}`;
      const wrapper: CodeDescription[] = await this.http.get<CodeDescription[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.get('ErrorGetVehicleVersion'));
    }
  }
}
