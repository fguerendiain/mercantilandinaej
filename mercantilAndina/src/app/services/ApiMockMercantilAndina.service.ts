import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as messages from '../../messages.json';
import { Coverage } from '../entities/General.model';

const BASE_API = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';

@Injectable({ providedIn: 'root' })
export class ApiMockMercantilAndinaService {

  constructor(private http: HttpClient){}

  async getUserNameAvailability(userName: string): Promise<boolean>{
    try{
      const path = `/usuarios?nombre=${userName}`;
      const wrapper: boolean = await this.http.get<boolean>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetUserNameAvailability);
    }
  }

  async getInsuranceCoverage(): Promise<Coverage[]>{
    try{
      const path = '/coberturas';
      const wrapper: Coverage[] = await this.http.get<Coverage[]>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetInsuranceCoverage);
    }
  }
}
