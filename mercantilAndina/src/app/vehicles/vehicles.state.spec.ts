import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Selector, State, Store } from '@ngxs/store';
import { VehicleState } from './vehicles.state';
import { CodeDescription } from '../entities/General.model';
import { InitVehiclesBrands, InitVehicleModels, InitVehicleVersions, InitVehicleYears} from './vehicles.actions';
import { VehicleStateModel } from './vehicles.models';
import { ApiMercantilAndinaService } from '../services/ApiMercantilAndina.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserStateModel, UserVehicle } from '../user/user.models';
import { Injectable } from '@angular/core';

const USER: UserStateModel =  {
  usuario: {
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
  },
  vehiculo: {
    marca: { codigo: '1', desc: 'RENAULT'},
    year: '2001',
    modelo: 'GRANDE',
    version: { codigo: '1', desc: 'SIN TECHO'}
  },
  cobertura: {
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
  }
};

@State<UserStateModel>({
  name: 'user',
  defaults: USER
})
@Injectable()
export class UserState {

  @Selector()
  static GetUserVehicleDetail(state: UserStateModel): UserVehicle {
    return state.vehiculo;
  }
}


describe('VehicleState', () => {
  let store: Store;
  let serviceSpy: jasmine.SpyObj<ApiMercantilAndinaService>;


  const MARCA1: CodeDescription = {
    codigo: '1',
    desc: 'RENAULT'
  };

  const MARCA2: CodeDescription = {
    codigo: '2',
    desc: 'FORD'
  };

  const MARCA3: CodeDescription = {
    codigo: '3',
    desc: 'CHEVROLETE'
  };

  const MARCA4: CodeDescription = {
    codigo: '4',
    desc: 'FIAT'
  };


  const VERSION1: CodeDescription = {
    codigo: '1',
    desc: 'SIN TECHO'
  };

  const VERSION2: CodeDescription = {
    codigo: '2',
    desc: 'SIN AIRE'
  };

  const VERSION3: CodeDescription = {
    codigo: '3',
    desc: 'SIN RUEDAS'
  };

  const VERSION4: CodeDescription = {
    codigo: '4',
    desc: 'SIN NAFTA'
  };

  const YEARS: string[] = [
    '2000', '2001', '2002', '2003', '2004',
    '2005', '2006', '2007', '2008', '2009',
    '2010', '2011', '2012', '2013', '2014',
    '2015', '2016', '2017', '2018', '2019',
    '2020'
  ];

  const MODELOS: string[] = [
    'GRANDE', 'CHICO', 'ALTO', 'FLACO'
  ];

  const MARCAS: CodeDescription[] = [MARCA1, MARCA2, MARCA3, MARCA4];

  const VERSIONES: CodeDescription[] = [VERSION1, VERSION2, VERSION3, VERSION4];

  const VEHICLESTATEMODELDEFAULT: VehicleStateModel = {
    marcas: [],
    years: [],
    modelos: [],
    versiones: []
  };

  beforeEach(async(() => {
    const vehicleServSpy = jasmine.createSpyObj<ApiMercantilAndinaService>('ApiMercantilAndinaService', ['getCarBrands', 'getCarModels', 'getCarVersion']);

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([VehicleState, UserState]), HttpClientTestingModule
      ],
      providers: [
        { provide: ApiMercantilAndinaService, useValue: vehicleServSpy },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ApiMercantilAndinaService) as jasmine.SpyObj<ApiMercantilAndinaService>;
    store = TestBed.inject(Store);
    store.reset({
      vehicles: VEHICLESTATEMODELDEFAULT,
      user: USER
      }
    );
  });

  it('should create', () => {
    expect(store.selectSnapshot(state => state)).toBeTruthy();
  });

  it('InitVehiclesBrands: Carga las marcas obtenidas por servicio ', fakeAsync(() => {
    const empty = store.selectSnapshot(VehicleState.GetMarcas);
    expect(empty).toEqual([]);

    serviceSpy.getCarBrands.and.returnValue(of(MARCAS).toPromise());
    store.dispatch(new InitVehiclesBrands());
    tick();
    const result = store.selectSnapshot(VehicleState.GetMarcas);
    expect(result).toEqual(MARCAS);
  }));

  it('InitVehicleModels: Carga los modelos obtenidos por servicio ', fakeAsync(() => {
    const empty = store.selectSnapshot(VehicleState.GetModelos);
    expect(empty).toEqual([]);
    serviceSpy.getCarModels.and.returnValue(of(MODELOS).toPromise());
    store.dispatch(new InitVehicleModels());
    tick();
    const result = store.selectSnapshot(VehicleState.GetModelos);
    expect(result).toEqual(MODELOS);
  }));

  it('InitVehicleVersions: Carga las versiones obtenidas por servicio ', fakeAsync(() => {
    const empty = store.selectSnapshot(VehicleState.GetVersiones);
    expect(empty).toEqual([]);

    serviceSpy.getCarVersion.and.returnValue(of(VERSIONES).toPromise());
    store.dispatch(new InitVehicleVersions());
    tick();
    const result = store.selectSnapshot(VehicleState.GetVersiones);
    expect(result).toEqual(VERSIONES);
  }));

  it('InitVehicleYears: Calcula y carga los años habilitados ', fakeAsync(() => {
    const empty = store.selectSnapshot(VehicleState.GetYears);
    expect(empty).toEqual([]);
    spyOn(VehicleState.prototype, 'setYearsList').and.returnValue(YEARS);
    store.dispatch(new InitVehicleYears());
    tick();
    const result = store.selectSnapshot(VehicleState.GetYears);
    expect(result).toEqual(YEARS);
  }));

});
