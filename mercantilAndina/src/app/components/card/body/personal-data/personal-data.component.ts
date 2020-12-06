import { Component, OnInit } from '@angular/core';
import * as messages from '../../../../../messages.json';
import { UserValidationsHandler } from '../../../../user/userValidationHandler';
import { Select, Store } from '@ngxs/store';
import { ModifyUserDni,
         ModifyUserApellido,
         ModifyUserNombre,
         ModifyUserEmail,
         ModifyUserCelular,
         ModifyUserTelefono,
         ModifyUserFechNac,
         ModifyUserUserName,
         ModifyUserPassword } from '../../../../user/user.actions';
import { UserState } from 'src/app/user/user.state';
import { Observable } from 'rxjs';
import { UserStateModel } from 'src/app/user/user.models';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  headerTitle: string;
  userDetail: UserStateModel;

  dniLable: string;
  apellidoLable: string;
  nombreLable: string;
  emailLable: string;
  celularLable: string;
  telefonoLable: string;
  fechNacLable: string;
  usuarioLable: string;
  passwordLable: string;

  dniNgModel: string;
  apellidoNgModel: string;
  nombreNgModel: string;
  emailNgModel: string;
  celularNgModel: string;
  telefonoNgModel: string;
  fechNacNgModel: string;
  usuarioNgModel: string;
  passwordNgModel: string;

  dniErrorMsg: string;
  apellidoErrorMsg: string;
  nombreErrorMsg: string;
  emailErrorMsg: string;
  celularErrorMsg: string;
  telefonoErrorMsg: string;
  fechNacErrorMsg: string;
  usuarioErrorMsg: string;
  passwordErrorMsg: string;

  constructor(
    private validator: UserValidationsHandler,
    private store: Store) { }

  ngOnInit(): void {
    this.setPreviousData();
    this.setMessages();
  }

  setPreviousData(): void{
    this.userDetail = this.store.selectSnapshot(UserState.GetDetail);
    this.dniNgModel = this.userDetail.usuario.dni;
    this.apellidoNgModel = this.userDetail.usuario.apellido;
    this.nombreNgModel = this.userDetail.usuario.nombre;
    this.emailNgModel = this.userDetail.usuario.email;
    this.celularNgModel = this.userDetail.usuario.celular;
    this.telefonoNgModel = this.userDetail.usuario.telefono;
    this.fechNacNgModel = this.validator.stringifyDate(this.userDetail.usuario.fechNac);
    this.usuarioNgModel = this.userDetail.usuario.userName;
    this.passwordNgModel = this.userDetail.usuario.password;
  }

  setMessages(): void{
    this.headerTitle = messages.PersonalDataComponentHeaderTitle;
    this.dniLable = messages.PersonalDataComponentDniLable;
    this.apellidoLable = messages.PersonalDataComponentApellidoLable;
    this.nombreLable = messages.PersonalDataComponentNombreLable;
    this.emailLable = messages.PersonalDataComponentEmailLable;
    this.celularLable = messages.PersonalDataComponentCelularLable;
    this.telefonoLable = messages.PersonalDataComponentTelefonoLable;
    this.fechNacLable = messages.PersonalDataComponentFechNacLable;
    this.usuarioLable = messages.PersonalDataComponentUsuarioLable;
    this.passwordLable = messages.PersonalDataComponentPasswordLable;
  }


  onSetDni(): void{
    this.dniErrorMsg = null;
    try{
      this.validator.validateUserDni(this.dniNgModel);
      this.store.dispatch(new ModifyUserDni(this.dniNgModel));
    }catch (err){
      this.dniErrorMsg = err.message;
      this.store.dispatch(new ModifyUserDni(null));
    }
  }

  onSetApellido(): void{
    this.apellidoErrorMsg = null;
    try{
      this.validator.validateUserApellido(this.apellidoNgModel);
      this.store.dispatch(new ModifyUserApellido(this.apellidoNgModel));
    }catch (err){
      this.apellidoErrorMsg = err.message;
      this.store.dispatch(new ModifyUserApellido(null));
    }
  }

  onSetNombre(): void{
    this.nombreErrorMsg = null;
    try{
      this.validator.validateUserNombre(this.nombreNgModel);
      this.store.dispatch(new ModifyUserNombre(this.nombreNgModel));
    }catch (err){
      this.nombreErrorMsg = err.message;
      this.store.dispatch(new ModifyUserNombre(null));
    }
  }

  onSetEmail(): void{
    this.emailErrorMsg = null;
    try{
      this.validator.validateUserEmail(this.emailNgModel);
      this.store.dispatch(new ModifyUserEmail(this.emailNgModel));
    }catch (err){
      this.emailErrorMsg = err.message;
      this.store.dispatch(new ModifyUserEmail(null));
    }
  }

  onSetCelular(): void{
    this.celularErrorMsg = null;
    try{
      this.validator.validateUserPhone(this.celularNgModel);
      this.store.dispatch(new ModifyUserCelular(this.celularNgModel));
    }catch (err){
      this.celularErrorMsg = err.message;
      this.store.dispatch(new ModifyUserCelular(null));
    }
  }

  onSetTelefono(): void{
    this.telefonoErrorMsg = null;
    try{
      this.validator.validateUserPhone(this.telefonoNgModel);
      this.store.dispatch(new ModifyUserTelefono(this.telefonoNgModel));
    }catch (err){
      this.telefonoErrorMsg = err.message;
      this.store.dispatch(new ModifyUserTelefono(null));
    }
  }

  onSetFechNac(): void{
    this.fechNacErrorMsg = null;
    try{
      this.validator.validateFechNac(this.fechNacNgModel);
      this.store.dispatch(new ModifyUserFechNac(this.validator.formatDate(this.fechNacNgModel)));
    }catch (err){
      this.fechNacErrorMsg = err.message;
      this.store.dispatch(new ModifyUserFechNac(null));
    }
  }

  async onSetUsuario(): Promise<void>{
    this.usuarioErrorMsg = null;
    try{
      await this.validator.validateUserName(this.usuarioNgModel);
      this.store.dispatch(new ModifyUserUserName(this.usuarioNgModel));
    }catch (err){
      this.usuarioErrorMsg = err.message;
      this.store.dispatch(new ModifyUserUserName(null));
    }
  }

  onSetPassword(): void{
    this.passwordErrorMsg = null;
    try{
      this.validator.validateUserPasswordStrength(this.passwordNgModel);
      this.store.dispatch(new ModifyUserPassword(this.passwordNgModel));
    }catch (err){
      this.passwordErrorMsg = err.message;
      this.store.dispatch(new ModifyUserPassword(null));
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphaOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123) && charCode !== 32) {
      return false;
    }
    return true;
  }

  noSpaces(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 32) {
      return false;
    }
    return true;
  }


}
