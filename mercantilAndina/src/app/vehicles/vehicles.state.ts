import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { VehicleStateModel } from './vehicles.models';
import { InitVehicleModels, InitVehiclesBrands, InitVehicleVersions, InitVehicleYears } from './vehicles.actions';
import { ApiMercantilAndinaService } from '../services/ApiMercantilAndina.service';
import { CodeDescription } from '../entities/General.model';
import { UserVehicle } from '../user/user.models';
import { UserState } from '../user/user.state';
import produce from 'immer';
import { cpuUsage } from 'process';

@State<VehicleStateModel>({
  name: 'vehicles',
  defaults: {
    marcas: [],
    years: [],
    modelos: [],
    versiones: []
  }
})

@Injectable()
export class VehicleState {

  @Selector()
  static GetMarcas(state: VehicleStateModel): CodeDescription[] {
    return state.marcas;
  }

  @Selector()
  static GetYears(state: VehicleStateModel): string[] {
    return state.years;
  }

  @Selector()
  static GetModelos(state: VehicleStateModel): string[] {
    return state.modelos;
  }

  @Selector()
  static GetVersiones(state: VehicleStateModel): CodeDescription[] {
    return state.versiones;
  }

  constructor(private service: ApiMercantilAndinaService, private store: Store){}

  @Action(InitVehiclesBrands)
  async initVehiclesBrands(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const brandArray: CodeDescription[] = [];
    const result = await this.service.getCarBrands();
    result.forEach((brand) => {
      if (+brand.codigo > 0){
        brandArray.push({
          codigo: brand.codigo,
          desc: brand.desc,
        });
      }
    });
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.marcas = brandArray;
      })
    );
  }

  @Action(InitVehicleModels)
  async initVehicleModels(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarModels(userVehicle.marca.codigo, userVehicle.year);
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.modelos = result;
      })
    );
  }

  @Action(InitVehicleVersions)
  async initVehicleVersions(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarVersion(userVehicle.marca.codigo, userVehicle.year, userVehicle.modelo);
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.versiones = result;
      })
    );
  }

  @Action(InitVehicleYears)
  async initVehicleYears(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const result = this.setYearsList();
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.years = result;
      })
    );
  }

  setYearsList(): string[]{
    const result: string[] = [];
    const today = new Date().getFullYear();
    for (let i = today - 20 ; i <= today; i++){
      result.push(i.toString());
    }
    return result;
  }
}

