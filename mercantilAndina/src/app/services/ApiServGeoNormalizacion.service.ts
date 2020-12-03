import * as messages from './../../messages.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipios, Provincias } from '../entities/General.model';

const BASE_API = 'https://apis.datos.gob.ar/georef/api';

@Injectable({ providedIn: 'root' })
export class ApiServGeoNormalizacionService {

  constructor(private http: HttpClient){}

  async getProvincias(): Promise<Provincias>{
    try{
      const path = '/provincias';
      const wrapper: Provincias = await this.http.get<Provincias>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetProvincias);
    }
  }

  async getMunicipios(idProvincia: string): Promise<Municipios>{
    if (!idProvincia){throw new Error(messages.ErrorValidIdProvincia); }
    try{
      const path = `/municipios?provincia=${idProvincia}&campos=id,nombre&max=135`;
      const wrapper: Municipios = await this.http.get<Municipios>(BASE_API + path).toPromise();
      return wrapper;
    }catch (error){
      throw new Error(messages.ErrorGetMunicipios);
    }
  }

}
