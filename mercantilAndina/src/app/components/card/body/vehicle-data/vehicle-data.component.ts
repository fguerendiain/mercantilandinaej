import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as messages from '../../../../../messages.json';
import { CodeDescription } from '../../../../entities/General.model';
import { VehicleState } from '../../../../vehicles/vehicles.state';
import { ModifyUserVehicleMarca, ModifyUserVehicleModelo, ModifyUserVehicleVersion, ModifyUserVehicleYear } from '../../../../user/user.actions';
import { InitVehicleModels, InitVehicleVersions, InitVehiclesBrands, InitVehicleYears } from '../../../../vehicles/vehicles.actions';
import { UserState } from 'src/app/user/user.state';
import { UserStateModel } from 'src/app/user/user.models';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {

  headerTitle: string;

  @Select(VehicleState.GetMarcas) brandsList$: Observable<CodeDescription[]>;
  @Select(VehicleState.GetYears) yearsList$: Observable<string[]>;
  @Select(VehicleState.GetModelos) modelsList$: Observable<string[]>;
  @Select(VehicleState.GetVersiones) versionsList$: Observable<CodeDescription[]>;

  userDetail: UserStateModel;

  marcaLable: string;
  yearLable: string;
  modeloLable: string;
  versionLable: string;

  marcaNgModel: CodeDescription;
  yearNgModel: string;
  modeloNgModel: string;
  versionNgModel: CodeDescription;

  marcaErrorMsg: string;
  yearErrorMsg: string;
  modeloErrorMsg: string;
  versionErrorMsg: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setPreviousData();
    this.setMessages();
    this.onReloadService();
  }

  setPreviousData(): void{
    this.userDetail = this.store.selectSnapshot(UserState.GetDetail);
    this.marcaNgModel = this.userDetail.vehiculo.marca;
    this.yearNgModel = this.userDetail.vehiculo.year;
    this.modeloNgModel = this.userDetail.vehiculo.modelo;
    this.versionNgModel = this.userDetail.vehiculo.version;
  }

  setMessages(): void{
    this.headerTitle = messages.VehicleDataComponentHeaderTitle;
    this.marcaLable = messages.VehicleDataComponentHeaderMarcaLable;
    this.yearLable = messages.VehicleDataComponentHeaderYearLable;
    this.modeloLable = messages.VehicleDataComponentHeaderModeloLable;
    this.versionLable = messages.VehicleDataComponentHeaderVersionLable;
  }

  onSetMarca(): void{
    this.marcaErrorMsg = null;
    this.yearErrorMsg = null;
    this.modeloErrorMsg = null;
    this.versionErrorMsg = null;
    try{
      this.store.dispatch(new ModifyUserVehicleMarca(this.marcaNgModel));
      this.store.dispatch(new ModifyUserVehicleYear(null));
      this.yearNgModel = null;
      this.store.dispatch(new ModifyUserVehicleModelo(null));
      this.modeloNgModel = null;
      this.store.dispatch(new ModifyUserVehicleVersion(null));
      this.versionNgModel = null;
      this.store.dispatch(new InitVehicleYears());
    }catch (err){
      this.store.dispatch(new ModifyUserVehicleMarca(null));
      this.marcaNgModel = null;
      this.marcaErrorMsg = err.message;
    }
  }

  onSetYear(): void{
    this.yearErrorMsg = null;
    this.modeloErrorMsg = null;
    this.versionErrorMsg = null;
    try{
      this.store.dispatch(new ModifyUserVehicleYear(this.yearNgModel));
      this.store.dispatch(new ModifyUserVehicleModelo(null));
      this.modeloNgModel = null;
      this.store.dispatch(new ModifyUserVehicleVersion(null));
      this.versionNgModel = null;
      this.store.dispatch( new InitVehicleModels());
    }catch (err){
      this.store.dispatch(new ModifyUserVehicleYear(null));
      this.yearNgModel = null;
      this.yearErrorMsg = err.message;
    }
    }

  onSetModel(): void{
    this.modeloErrorMsg = null;
    this.versionErrorMsg = null;
    try{
      this.store.dispatch(new ModifyUserVehicleModelo(this.modeloNgModel));
      this.store.dispatch(new ModifyUserVehicleVersion(null));
      this.versionNgModel = null;
      this.store.dispatch(new InitVehicleVersions());
    }catch (err){
      this.store.dispatch(new ModifyUserVehicleModelo(null));
      this.modeloNgModel = null;
      this.modeloErrorMsg = err.message;
    }
  }

  onSetVersion(): void{
    this.versionErrorMsg = null;
    try{
      this.store.dispatch(new ModifyUserVehicleVersion(this.versionNgModel));
    }catch (err){
      this.store.dispatch(new ModifyUserVehicleVersion(null));
      this.versionNgModel = null;
      this.versionErrorMsg = err.message;
    }
  }

  async onReloadService(): Promise<void>{
    this.marcaErrorMsg = null;
    try{
      await this.store.dispatch(new InitVehiclesBrands()).toPromise();
    }catch (err){
      this.marcaErrorMsg = err.messages;
    }
  }

  defaultSelectItem(previous: CodeDescription, actual: string): string{
    return previous && actual ? previous.desc : actual;
  }
}
