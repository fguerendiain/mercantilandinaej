import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CodeDescription } from 'src/app/entities/General.model';
import { ProvinciasState } from '../../../../../provincias/provincias.state';
import * as messages from '../../../../../../messages.json';
import { ModifyUserProvincia, ModifyUserCiudad, ModifyUserDomicilio } from '../../../../../user/user.actions';
import { InitMunicipios, InitProvincias } from '../../../../../provincias/provincias.actions';
import { UserStateModel } from 'src/app/user/user.models';
import { UserState } from 'src/app/user/user.state';

@Component({
  selector: 'app-ubicacion-data',
  templateUrl: './ubicacion-data.component.html',
  styleUrls: ['./ubicacion-data.component.css']
})
export class UbicacionDataComponent implements OnInit {


  @Select(ProvinciasState.GetProvincias) provinciasList$: Observable<CodeDescription[]>;
  @Select(ProvinciasState.GetMunicipios) municipiosList$: Observable<CodeDescription[]>;

  userDetail: UserStateModel;

  provinciaLable: string;
  municipioLable: string;
  domicilioLable: string;

  provinciaNgModel: CodeDescription;
  municipioNgModel: CodeDescription;
  domicilioNgModel: string;

  provinciaErrMsg: string;
  municipioErrMsg: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setPreviousData();
    this.setMessages();
    this.onReloadService();
  }

  setPreviousData(): void{
    this.userDetail = this.store.selectSnapshot(UserState.GetDetail);
    this.provinciaNgModel = this.userDetail.usuario.provincia;
    this.municipioNgModel = this.userDetail.usuario.ciudad;
    this.domicilioNgModel = this.userDetail.usuario.domicilio;
  }

  setMessages(): void{
    this.provinciaLable = messages.UbicacionDataComponentProvinciaLable;
    this.municipioLable = messages.UbicacionDataComponentMunicipioLable;
    this.domicilioLable = messages.UbicacionDataComponentDomicilioLable;
  }


  onSetProvincia(): void{
    this.provinciaErrMsg = null;
    this.municipioErrMsg = null;
    try{
      this.store.dispatch(new ModifyUserProvincia(this.provinciaNgModel));
      this.store.dispatch(new ModifyUserCiudad(null));
      this.municipioNgModel = null;
      this.store.dispatch(new ModifyUserDomicilio(null));
      this.domicilioNgModel = null;
      this.store.dispatch(new InitMunicipios());
    }catch (err){
      this.store.dispatch(new ModifyUserProvincia(null));
      this.provinciaNgModel = null;
      this.provinciaErrMsg = err.message;
    }
  }

  onSetmunicipio(): void{
    this.municipioErrMsg = null;
    try{
      this.store.dispatch(new ModifyUserCiudad(this.municipioNgModel));
      this.store.dispatch(new ModifyUserDomicilio(null));
      this.domicilioNgModel = null;
    }catch (err){
      this.store.dispatch(new ModifyUserCiudad(null));
      this.municipioNgModel = null;
      this.municipioErrMsg = err.message;
    }
  }

  onSetdomicilio(): void{
    this.store.dispatch(new ModifyUserDomicilio(this.domicilioNgModel));
  }

  defaultSelectItem(previous: CodeDescription, actual: string): string{
    if (previous && actual && previous.desc === actual){
      return previous.desc;
    }
    return actual;
  }

  async onReloadService(): Promise<void>{
    this.provinciaErrMsg = null;
    try{
      await this.store.dispatch(new InitProvincias()).toPromise();
    }catch (err){
      this.provinciaErrMsg = err.messages;
    }
  }
}
