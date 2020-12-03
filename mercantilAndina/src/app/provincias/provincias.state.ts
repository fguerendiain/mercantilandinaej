import { ProvinciasStateModel } from './provincias.models';
import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { InitMunicipios, InitProvincias } from './provincias.actions';
import { ApiServGeoNormalizacionService } from '../services/ApiServGeoNormalizacion.service';
import { CodeDescription } from '../entities/General.model';
import { UserState } from '../user/user.state';
import produce from 'immer';

@State<ProvinciasStateModel>({
  name: 'provincias',
  defaults: {
    provincias: [],
    municipios: []
  }
})

@Injectable()
export class ProvinciasState {

  static GetProvinciaByProductId(idProvincia: string): (state: ProvinciasStateModel) => string {
    return createSelector(
      [ProvinciasState],
      (state: ProvinciasStateModel) => {
        state.provincias.forEach((prov) => {
          if (prov.codigo === idProvincia){
            return prov.desc;
          }
        });
        return null;
      }
    );
  }

  static GetMunicipalidadByProductId(idMunicipalidad: string): (state: ProvinciasStateModel) => string {
    return createSelector(
      [ProvinciasState],
      (state: ProvinciasStateModel) => {
        state.municipios.forEach((muni) => {
          if (muni.codigo === idMunicipalidad){
            return muni.desc;
          }
        });
        return null;
      }
    );
  }

  @Selector()
  static GetProvincias(state: ProvinciasStateModel): string[] {
    const result: string[] = [];
    state.provincias.forEach((prov) => {
      result.push(prov.codigo);
    });
    return result;
  }

  @Selector()
  static GetMunicipios(state: ProvinciasStateModel): string[] {
    const result: string[] = [];
    state.municipios.forEach((muni) => {
      result.push(muni.codigo);
    });
    return result;
  }

  constructor(private service: ApiServGeoNormalizacionService, private store: Store){}

  @Action(InitProvincias)
  async initProvincias(ctx: StateContext<ProvinciasStateModel>): Promise<ProvinciasStateModel> {
    const provArray: CodeDescription[] = [];
    const result = await this.service.getProvincias();
    result.provincias.forEach((prov) => {
      provArray.push({
        codigo: prov.id,
        desc: prov.nombre
      });
    });
    return ctx.setState({
      provincias: provArray,
      municipios: []
    });
  }

  @Action(InitMunicipios)
  async initMunicipios(ctx: StateContext<ProvinciasStateModel>): Promise<ProvinciasStateModel> {
    const muniArray: CodeDescription[] = [];
    const userProvincia: string = this.store.selectSnapshot(UserState.GetUserProvincia);
    const result = await this.service.getMunicipios(userProvincia);
    result.municipios.forEach((muni) => {
      muniArray.push({
        codigo: muni.id,
        desc: muni.nombre
      });
    });
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.municipios = muniArray;
      })
    );
  }

}
