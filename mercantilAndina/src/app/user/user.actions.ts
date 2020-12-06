import { UserStateModel} from './user.models';
import { Coverage, CodeDescription } from '../entities/General.model';

export class InitUser {
  static readonly type = '[User] Inicializar Usuario';
  public constructor(public user: UserStateModel){}
}

export class DropUser {
  static readonly type = '[User] Limpiar Usuario';
}


export class ModifyUserDni {
  static readonly type = '[User] Modificar Usuario: dni';
  public constructor(public dni: string){}
}

export class ModifyUserApellido {
  static readonly type = '[User] Modificar Usuario: apellido';
  public constructor(public apellido: string){}
}

export class ModifyUserNombre {
  static readonly type = '[User] Modificar Usuario: nombre';
  public constructor(public nombre: string){}
}

export class ModifyUserEmail {
  static readonly type = '[User] Modificar Usuario: email';
  public constructor(public email: string){}
}

export class ModifyUserCelular {
  static readonly type = '[User] Modificar Usuario: celular';
  public constructor(public celular: string){}
}

export class ModifyUserTelefono {
  static readonly type = '[User] Modificar Usuario: telefono';
  public constructor(public telefono: string){}
}

export class ModifyUserProvincia {
  static readonly type = '[User] Modificar Usuario: provincia';
  public constructor(public provincia: CodeDescription){}
}

export class ModifyUserCiudad {
  static readonly type = '[User] Modificar Usuario: ciudad';
  public constructor(public ciudad: CodeDescription){}
}

export class ModifyUserDomicilio {
  static readonly type = '[User] Modificar Usuario: domicilio';
  public constructor(public domicilio: string){}
}

export class ModifyUserFechNac {
  static readonly type = '[User] Modificar Usuario: fechNac';
  public constructor(public fechNac: Date){}
}

export class ModifyUserUserName {
  static readonly type = '[User] Modificar Usuario: userName';
  public constructor(public userName: string){}
}

export class ModifyUserPassword {
  static readonly type = '[User] Modificar Usuario: password';
  public constructor(public password: string){}
}

export class ModifyUserCoverage {
  static readonly type = '[User] Modificar Usuario: coverage';
  public constructor(public coverage: Coverage){}
}

export class ModifyUserVehicleMarca  {
  static readonly type = '[User] Modificar Vehiculo de Usuario: marca';
  public constructor(public marca: CodeDescription){}
}

export class ModifyUserVehicleYear  {
  static readonly type = '[User] Modificar Vehiculo de Usuario: year';
  public constructor(public year: string){}
}

export class ModifyUserVehicleModelo  {
  static readonly type = '[User] Modificar Vehiculo de Usuario: modelo';
  public constructor(public modelo: string){}
}

export class ModifyUserVehicleVersion  {
  static readonly type = '[User] Modificar Vehiculo de Usuario: version';
  public constructor(public version: CodeDescription){}
}
