import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { DropUser,
         InitUser,
         ModifyUserApellido,
         ModifyUserNombre,
         ModifyUserEmail,
         ModifyUserCelular,
         ModifyUserTelefono,
         ModifyUserFechNac,
         ModifyUserUserName,
         ModifyUserPassword,
         ModifyUserCoverage,
         ModifyUserVehicleMarca,
         ModifyUserVehicleYear,
         ModifyUserVehicleModelo,
         ModifyUserVehicleVersion,
         ModifyUserDni,
         } from './user.actions';
import { UserStateModel, UserVehicle } from './user.models';
import produce from 'immer';
import { ModifyUserProvincia, ModifyUserCiudad, ModifyUserDomicilio } from './user.actions';
import { VehicleState } from '../vehicles/vehicles.state';
import { ProvinciasState } from '../provincias/provincias.state';
import { VehicleStateModel } from '../vehicles/vehicles.models';
import { ProvinciasStateModel } from '../provincias/provincias.models';
import { Municipio, CodeDescription } from '../entities/General.model';

const def: UserStateModel =  {
  usuario: {
    dni:  null,
    apellido:  null,
    nombre:  null,
    email:  null,
    celular:  null,
    telefono:  null,
    provincia:  null,
    ciudad:  null,
    domicilio:  null,
    fechNac:  null,
    userName:  null,
    password:  null
  },
  vehiculo: {
    marca: null,
    year: null,
    modelo: null,
    version: null
  },
  cobertura: {
    numero:  null,
    costo:  null,
    producto:  null,
    texto:  null,
    franquicia:  null,
    codigoProducto:  null,
    titulo:  null,
    descripcion:  null,
    puntaje:  null,
    granizo:  null
  }
};

@State<UserStateModel>({
  name: 'user',
  defaults: def
})

@Injectable()
export class UserState {


  @Selector()
  static GetUserProvincia(state: UserStateModel): CodeDescription {
    return state.usuario.provincia;
  }

  @Selector()
  static GetUserCoverage(state: UserStateModel): number {
    return state.cobertura.codigoProducto;
  }

  @Selector()
  static GetUserVehicleDetail(state: UserStateModel): UserVehicle {
    return state.vehiculo;
  }

  @Selector()
  static GetDetail(state: UserStateModel): UserStateModel {
    return state;
  }

  @Selector()
  static DataIsReadyToSend(state: UserStateModel): boolean {
    if (state.usuario.dni
      && state.usuario.apellido
      && state.usuario.nombre
      && state.usuario.provincia
      && state.usuario.ciudad
      && state.usuario.domicilio
      && state.usuario.userName
      && state.usuario.password
      && state.cobertura.codigoProducto
      && state.vehiculo.marca
      && state.vehiculo.year
      && state.vehiculo.modelo){
        return true;
      }
    return false;
  }

  constructor() { }

  @Action(InitUser)
  initUserState(ctx: StateContext<UserStateModel>, action: InitUser): UserStateModel {
      return ctx.setState({
        usuario: action.user.usuario,
        vehiculo: action.user.vehiculo,
        cobertura: action.user.cobertura
      });
  }

  @Action(DropUser)
  DropUserState(ctx: StateContext<UserStateModel>): UserStateModel {
      return  ctx.setState({
        usuario: def.usuario,
        vehiculo: def.vehiculo,
        cobertura: def.cobertura
      });
  }

  @Action(ModifyUserDni)
  modifyUserState(ctx: StateContext<UserStateModel>, action: ModifyUserDni): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.dni = action.dni;
      })
    );
  }

  @Action(ModifyUserApellido)
  modifyUserApellido(ctx: StateContext<UserStateModel>, action: ModifyUserApellido): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.apellido = action.apellido;
      })
    );
  }

  @Action(ModifyUserNombre)
  modifyUserNombre(ctx: StateContext<UserStateModel>, action: ModifyUserNombre): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.nombre = action.nombre;
      })
    );
  }

  @Action(ModifyUserEmail)
  modifyUserEmail(ctx: StateContext<UserStateModel>, action: ModifyUserEmail): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.email = action.email;
      })
    );
  }

  @Action(ModifyUserCelular)
  modifyUserCelular(ctx: StateContext<UserStateModel>, action: ModifyUserCelular): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.celular = action.celular;
      })
    );
  }

  @Action(ModifyUserTelefono)
  modifyUserTelefono(ctx: StateContext<UserStateModel>, action: ModifyUserTelefono): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.telefono = action.telefono;
      })
    );
  }

  @Action(ModifyUserProvincia)
  modifyUserProvincia(ctx: StateContext<UserStateModel>, action: ModifyUserProvincia): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.provincia = action.provincia;
      })
    );
  }

  @Action(ModifyUserCiudad)
  modifyUserCiudad(ctx: StateContext<UserStateModel>, action: ModifyUserCiudad): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.ciudad  = action.ciudad;
      })
    );
  }

  @Action(ModifyUserDomicilio)
  modifyUserDomicilio(ctx: StateContext<UserStateModel>, action: ModifyUserDomicilio): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.domicilio = action.domicilio;
      })
    );
  }

  @Action(ModifyUserFechNac)
  modifyUserFechNac(ctx: StateContext<UserStateModel>, action: ModifyUserFechNac): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.fechNac = action.fechNac;
      })
    );
  }

  @Action(ModifyUserUserName)
  modifyUserUserName(ctx: StateContext<UserStateModel>, action: ModifyUserUserName): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.userName = action.userName;
      })
    );
  }

  @Action(ModifyUserPassword)
  modifyUserPassword(ctx: StateContext<UserStateModel>, action: ModifyUserPassword): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.usuario.password = action.password;
      })
    );
  }

  @Action(ModifyUserCoverage)
  modifyUserCoverage(ctx: StateContext<UserStateModel>, action: ModifyUserCoverage): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.cobertura = action.coverage;
      })
    );
  }

  @Action(ModifyUserVehicleMarca)
  modifyUserVehicleMarca(ctx: StateContext<UserStateModel>, action: ModifyUserVehicleMarca): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.vehiculo.marca = action.marca ?? null;
      })
    );
  }

  @Action(ModifyUserVehicleYear)
  modifyUserVehicleYear(ctx: StateContext<UserStateModel>, action: ModifyUserVehicleYear): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.vehiculo.year = action.year  ?? null;
      })
    );
  }

  @Action(ModifyUserVehicleModelo)
  modifyUserVehicleModelo(ctx: StateContext<UserStateModel>, action: ModifyUserVehicleModelo): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.vehiculo.modelo = action.modelo  ?? null;
      })
    );
  }

  @Action(ModifyUserVehicleVersion)
  modifyUserVehicleVersion(ctx: StateContext<UserStateModel>, action: ModifyUserVehicleVersion): UserStateModel {
    return ctx.setState(
      produce(ctx.getState(), draft => {
        draft.vehiculo.version = action.version  ?? null;
      })
    );
  }


}
