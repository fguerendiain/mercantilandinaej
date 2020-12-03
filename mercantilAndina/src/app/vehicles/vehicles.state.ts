import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { VehicleStateModel } from './vehicles.models';
import { InitVehicleModels, InitVehiclesBrands, InitVehicleVersions } from './vehicles.actions';
import { ApiMercantilAndinaService } from '../services/ApiMercantilAndina.service';
import { CodeDescription } from '../entities/General.model';
import { UserStateModel, UserVehicle } from '../user/user.models';
import { UserState } from '../user/user.state';
import produce from 'immer';
import { stringify } from 'querystring';

@State<VehicleStateModel>({
  name: 'provincias',
  defaults: {
    marcas: [],
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
  static GetMarcas(state: VehicleStateModel): string[] {
    const result: string[] = [];
    state.marcas.forEach((brand) => {
      result.push(brand.codigo);
    });
    return result;
  }

  @Selector()
  static GetModelos(state: VehicleStateModel): string[] {
    return state.modelos;
  }

  @Selector()
  static GetVersiones(state: VehicleStateModel): string[] {
    const result: string[] = [];
    state.versiones.forEach((ver) => {
      result.push(ver.codigo);
    });
    return result;
  }

  constructor(private service: ApiMercantilAndinaService, private store: Store){}

  @Action(InitVehiclesBrands)
  async initVehiclesBrands(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const brandArray: CodeDescription[] = [];
    const result = await this.service.getCarBrands();
    result.forEach((brand) => {
      brandArray.push({
        codigo: brand.codigo,
        desc: brand.desc,
      });
    });
    return ctx.setState({
      marcas: brandArray,
      modelos: [],
      versiones: [],
    });
  }

  @Action(InitVehicleModels)
  async initVehicleModels(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const modelsArray: string[] = [];
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarModels(userVehicle.marca, userVehicle.year);
    result.forEach((mod) => {
      modelsArray.push(mod);
    });
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.modelos = modelsArray;
        draft.versiones = [];
      })
    );
  }

  @Action(InitVehicleVersions)
  async initVehicleVersions(ctx: StateContext<VehicleStateModel>): Promise<VehicleStateModel> {
    const versionsArray: CodeDescription[] = [];
    const userVehicle: UserVehicle = this.store.selectSnapshot(UserState.GetUserVehicleDetail);
    const result = await this.service.getCarVersion(userVehicle.marca, userVehicle.year, userVehicle.modelo);
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

}

