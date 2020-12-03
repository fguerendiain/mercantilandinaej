import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as messages from '../../messages.json';
import { CodeDescription } from '../entities/General.model';

const BASE_API = 'https://servicios.qamercantilandina.com.ar/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiMercantilAndinaService {

  constructor(private http: HttpClient){}

  async getCarBrands(): Promise<CodeDescription[]>{
    try{
      const path = '/vehiculos/marcas';
      const wrapper: CodeDescription[] = await this.http.get<CodeDescription[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetVehicleBrands);
    }
  }

  async getCarModels(code: string, year: string): Promise<string[]>{
    if (!code){throw new Error(messages.ErrorCarModelCode); }
    try{
      const path = `/vehiculos/marcas/${code}/${year}`;
      const wrapper: string[] = await this.http.get<string[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetVehicleModels);
    }
  }

  async getCarVersion(code: string, year: string, model: string): Promise<CodeDescription[]>{
    if (!code){throw new Error(messages.ErrorCarModelCode); }
    if (!model){throw new Error(messages.ErrorCarModelModel); }
    try{
      const path = `/vehiculos/marcas/${code}/${year}/${model}`;
      const wrapper: CodeDescription[] = await this.http.get<CodeDescription[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetVehicleVersion);
    }
  }
}
