import { TestBed, async,} from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Coverage } from '../entities/General.model';
import { UserData, UserStateModel, UserVehicle } from '../user/user.models';
import { DropUser,
         ModifyUserApellido,
         ModifyUserCelular,
         ModifyUserCiudad,
         ModifyUserCoverage,
         ModifyUserDni,
         ModifyUserDomicilio,
         ModifyUserEmail,
         ModifyUserFechNac,
         ModifyUserNombre,
         ModifyUserPassword,
         ModifyUserProvincia,
         ModifyUserTelefono,
         ModifyUserUserName,
         ModifyUserVehicleMarca,
         ModifyUserVehicleModelo,
         ModifyUserVehicleVersion,
         ModifyUserVehicleYear } from './user.actions';
import { UserState } from './user.state';

describe('UserState', () => {
  let store: Store;


  const USERDATA: UserData = {
    dni:  '31845954',
    apellido:  'Lopez',
    nombre:  'Ramiro',
    email:  'rlopez@mercantil.com',
    celular:  '+541161025484',
    telefono:  '1164184458',
    provincia:  { codigo: '1', desc: 'JAMAICA'},
    ciudad:  { codigo: '1', desc: 'NORUEGA'},
    domicilio:  'Arquimedez 123',
    fechNac:  new Date(16, 7, 1985),
    userName:  'usuario',
    password:  '1!dDdjske'
  };

  const USERDATAOBLIGATORIOSFALSE: UserData = {
    dni:  '31845954',
    apellido: null,
    nombre:  null,
    email:  'rlopez@mercantil.com',
    celular:  '+541161025484',
    telefono:  '1164184458',
    provincia:  { codigo: '1', desc: 'JAMAICA'},
    ciudad:  { codigo: '1', desc: 'NORUEGA'},
    domicilio:  'Arquimedez 123',
    fechNac:  new Date(16, 7, 1985),
    userName:  'usuario',
    password:  '1!dDdjske'
  };


  const USERVEHICLE: UserVehicle = {
    marca: { codigo: '1', desc: 'RENAULT'},
    year: '2001',
    modelo: 'GRANDE',
    version: { codigo: '1', desc: 'SIN TECHO'}
  };

  const USERCOVERAGE: Coverage = {
    numero:  1,
    costo:  62452,
    producto:  'TODO RIESGO',
    texto:  'FULL FULL DESTRUCCION TOTAL',
    franquicia:  100000,
    codigoProducto:  12,
    titulo:  'GRAN BARATA',
    descripcion:  'La mejor opcion del mercado',
    puntaje:  5,
    granizo:  true
  };

  const COVERAGECHANGE: Coverage = {
    numero:  2,
    costo:  97465,
    producto:  'TODO CAMBIO',
    texto:  'ESTO ES OTRA COSA',
    franquicia:  500000,
    codigoProducto:  6,
    titulo:  'GRAN CAMBIO',
    descripcion:  'La mejor OTRA opcion del mercado',
    puntaje:  2,
    granizo:  false
  };

  const USER: UserStateModel =  {
    usuario: USERDATA,
    vehiculo: USERVEHICLE,
    cobertura: USERCOVERAGE
  };

  const USERDEFAULT: UserStateModel =  {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState])]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    store.reset({
      user: USER
      }
    );
  });

  it('should create', () => {
    expect(store.selectSnapshot(state => state)).toBeTruthy();
  });

  it('DataIsReadyToSend: Retorna true si los valores obligatorios estan cargados', () => {
    const result = store.selectSnapshot(UserState.DataIsReadyToSend);
    expect(result).toEqual(true);
  });

  it('DataIsReadyToSend: Retorna false si aluno de los valores obligatorios no esta cargado', () => {
    store.reset({
      user: {
        usuario: USERDATAOBLIGATORIOSFALSE,
        vehiculo: USERVEHICLE,
        cobertura: USERCOVERAGE
    }});
    const result = store.selectSnapshot(UserState.DataIsReadyToSend);
    expect(result).toEqual(false);
  });

  it('DropUserState: pasa a null todos los valores del state', () => {
    store.dispatch(new DropUser());
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result).toEqual(USERDEFAULT);
  });

  it('ModifyUserDni: modifica valor del campo dni', () => {
    store.dispatch(new ModifyUserDni('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.dni).toEqual('123');
  });

  it('ModifyUserApellido: modifica valor del campo apellido', () => {
    store.dispatch(new ModifyUserApellido('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.apellido).toEqual('123');
  });

  it('ModifyUserNombre: modifica valor del campo nombre', () => {
    store.dispatch(new ModifyUserNombre('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.nombre).toEqual('123');
  });

  it('ModifyUserEmail: modifica valor del campo email', () => {
    store.dispatch(new ModifyUserEmail('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.email).toEqual('123');
  });

  it('ModifyUserCelular: modifica valor del campo celular', () => {
    store.dispatch(new ModifyUserCelular('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.celular).toEqual('123');
  });

  it('ModifyUserTelefono: modifica valor del campo telefono', () => {
    store.dispatch(new ModifyUserTelefono('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.telefono).toEqual('123');
  });

  it('ModifyUserProvincia: modifica valor del campo provincia', () => {
    store.dispatch(new ModifyUserProvincia({codigo: '1', desc: 'CATAMARCA'}));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.provincia).toEqual({codigo: '1', desc: 'CATAMARCA'});
  });

  it('ModifyUserCiudad: modifica valor del campo ciudad', () => {
    store.dispatch(new ModifyUserCiudad({codigo: '1', desc: 'QUILMES'}));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.ciudad).toEqual({codigo: '1', desc: 'QUILMES'});
  });

  it('ModifyUserDomicilio: modifica valor del campo domicilio', () => {
    store.dispatch(new ModifyUserDomicilio('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.domicilio).toEqual('123');
  });

  it('ModifyUserFechNac: modifica valor del campo fechanac', () => {
    const dumyDate = new Date(16, 7, 1986);
    store.dispatch(new ModifyUserFechNac(dumyDate));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.fechNac).toEqual(dumyDate);
  });

  it('ModifyUserUserName: modifica valor del campo username', () => {
    store.dispatch(new ModifyUserUserName('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.userName).toEqual('123');
  });

  it('ModifyUserPassword: modifica valor del campo password', () => {
    store.dispatch(new ModifyUserPassword('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.usuario.password).toEqual('123');
  });

  it('ModifyUserCoverage: modifica valor del campo coverage', () => {
    store.dispatch(new ModifyUserCoverage(COVERAGECHANGE));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.cobertura).toEqual(COVERAGECHANGE);
  });

  it('ModifyUserVehicleMarca: modifica valor del campo marca', () => {
    store.dispatch(new ModifyUserVehicleMarca({codigo: '1', desc: 'COCACOLA'}));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.vehiculo.marca).toEqual({codigo: '1', desc: 'COCACOLA'});
  });

  it('ModifyUserVehicleYear: modifica valor del campo marca', () => {
    store.dispatch(new ModifyUserVehicleYear('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.vehiculo.year).toEqual('123');
  });

  it('ModifyUserVehicleModelo: modifica valor del campo modelo', () => {
    store.dispatch(new ModifyUserVehicleModelo('123'));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.vehiculo.modelo).toEqual('123');
  });

  it('ModifyUserVehicleVersion: modifica valor del campo version', () => {
    store.dispatch(new ModifyUserVehicleVersion({codigo: '1', desc: 'FANTA'}));
    const result = store.selectSnapshot(UserState.GetDetail);
    expect(result.vehiculo.version).toEqual({codigo: '1', desc: 'FANTA'});
  });

});
