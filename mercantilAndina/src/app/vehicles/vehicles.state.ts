import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { VehicleStateModel } from './vehicles.models';
import { InitVehicleModels, InitVehiclesBrands, InitVehicleVersions, InitVehicleYears } from './vehicles.actions';
import { ApiMercantilAndinaService } from '../services/ApiMercantilAndina.service';
import { CodeDescription } from '../entities/General.model';
import { UserVehicle } from '../user/user.models';
import { UserState } from '../user/user.state';
import produce from 'immer';

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

  static GetBrandById(idBrand: string): (state: VehicleStateModel) => string {
    return createSelector(
      [VehicleState],
      (state: VehicleStateModel) => {
        state.marcas.forEach((brand) => {
          if(brand.codigo === idBrand){
            return brand.desc;
          }
        });
        return null;
      }
    );
  }

  static GetVersionById(idVersion: string): (state: VehicleStateModel) => string {
    return createSelector(
      [VehicleState],
      (state: VehicleStateModel) => {
        state.versiones.forEach((ver) => {
          if(ver.codigo === idVersion){
            return ver.desc;
          }
        });
        return null;
      }
    );
  }


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
    const modelsArray: string[] = [];
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarModels(userVehicle.marca.codigo, userVehicle.year);
    result.forEach((mod) => {
      modelsArray.push(mod);
    });
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.modelos = modelsArray;
      })
    );
  }

  @Action(InitVehicleVersions)
  async initVehicleVersions(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const versionsArray: CodeDescription[] = [];
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarVersion(userVehicle.marca.codigo, userVehicle.year, userVehicle.modelo);
    result.forEach((ver) => {
      versionsArray.push({
        codigo: ver.codigo,
        desc: ver.desc
      });
    });
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.versiones = versionsArray;
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

