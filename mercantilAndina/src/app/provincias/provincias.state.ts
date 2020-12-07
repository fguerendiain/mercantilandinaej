import { ProvinciasStateModel } from './provincias.models';
import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { InitMunicipios, InitProvincias } from './provincias.actions';
import { ApiServGeoNormalizacionService } from '../services/ApiServGeoNormalizacion.service';
import { CodeDescription } from '../entities/General.model';
import { UserState } from '../user/user.state';
import produce from 'immer';
import { state } from '@angular/animations';

@State<ProvinciasStateModel>({
  name: 'provincias',
  defaults: {
    provincias: [],
    municipios: []
  }
})

@Injectable()
export class ProvinciasState {

  @Selector()
  static GetProvincias(state: ProvinciasStateModel): CodeDescription[] {
    return state.provincias;
  }

  @Selector()
  static GetMunicipios(state: ProvinciasStateModel): CodeDescription[] {
    return state.municipios;
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
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.provincias = provArray;
      })
    );
  }

  @Action(InitMunicipios)
  async initMunicipios(ctx: StateContext<ProvinciasStateModel>): Promise<ProvinciasStateModel> {
    const muniArray: CodeDescription[] = [];
    const userProvincia: CodeDescription = this.store.selectSnapshot(UserState.GetUserProvincia);
    const result = await this.service.getMunicipios(userProvincia.codigo);
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
