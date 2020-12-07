import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Selector, State, Store } from '@ngxs/store';
import { CodeDescription, GeoLatLong, Municipio, Municipios, Parametros, Provincia, Provincias } from '../entities/General.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserStateModel } from '../user/user.models';
import { Injectable } from '@angular/core';
import { ProvinciasState } from './provincias.state';
import { ApiServGeoNormalizacionService } from '../services/ApiServGeoNormalizacion.service';
import { ProvinciasStateModel } from './provincias.models';
import { InitMunicipios, InitProvincias } from './provincias.actions';

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
  static GetUserProvincia(state: UserStateModel): CodeDescription {
    return state.usuario.provincia;
  }
}

const PROVINCIA1: CodeDescription = {
  codigo: '1',
  desc: 'CATAMARCA'
};

const PROVINCIA2: CodeDescription = {
  codigo: '2',
  desc: 'QUILMES'
};

const MUNICIPIO1: CodeDescription = {
  codigo: '1',
  desc: 'LA RIOJA'
};

const MUNICIPIO2: CodeDescription = {
  codigo: '2',
  desc: 'LANUS'
};

const PROVINCIAS: CodeDescription[] = [PROVINCIA1, PROVINCIA2];

const MUNICIPIOS: CodeDescription[] = [MUNICIPIO1, MUNICIPIO2];

const PROVINCIASSTATEMODEL: ProvinciasStateModel = {
  provincias: PROVINCIAS,
  municipios: MUNICIPIOS
};

const PROVINCIASSTATEMODELDEFAULT: ProvinciasStateModel = {
  provincias: [],
  municipios: []
};


const GEOLATLONG: GeoLatLong = {
  lat: 123,
  lon: 456
}

const PROV1: Provincia = {
  centroide: GEOLATLONG,
  id: PROVINCIA1.codigo,
  nombre: PROVINCIA1.desc
};

const PROV2: Provincia = {
  centroide: GEOLATLONG,
  id: PROVINCIA2.codigo,
  nombre: PROVINCIA2.desc
};

const PROVS: Provincias = {
  cantidad: 2,
  inicio: 1,
  parametros: {},
  provincias: [PROV1, PROV2],
  total: 2
}


const PARAMETROS: Parametros = {
  campos: [''],
  max: 1,
  provincia: ['']
};

const MUNI1: Municipio =  {
    id: MUNICIPIO1.codigo,
    nombre: MUNICIPIO1.desc
};

const MUNI2: Municipio =  {
  id: MUNICIPIO2.codigo,
  nombre: MUNICIPIO2.desc
};

const MUNIS: Municipios = {
  cantidad: 2,
  inicio: 1,
  municipios: [MUNI1, MUNI2],
  parametros: PARAMETROS,
  total: 2
};




describe('ProvinciasState', () => {
  let store: Store;
  let serviceSpy: jasmine.SpyObj<ApiServGeoNormalizacionService>;


  beforeEach(async(() => {
    const provinciaServSpy = jasmine.createSpyObj<ApiServGeoNormalizacionService>('ApiServGeoNormalizacionService', ['getProvincias', 'getMunicipios']);

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ProvinciasState, UserState]), HttpClientTestingModule
      ],
      providers: [
        { provide: ApiServGeoNormalizacionService, useValue: provinciaServSpy },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ApiServGeoNormalizacionService) as jasmine.SpyObj<ApiServGeoNormalizacionService>;
    store = TestBed.inject(Store);
    store.reset({
      provincias: PROVINCIASSTATEMODELDEFAULT,
      user: USER
      }
    );
  });

  it('should create', () => {
    expect(store.selectSnapshot(state => state)).toBeTruthy();
  });

  it('InitProvincias: Carga las provincias obtenidas por servicio ', fakeAsync(() => {
    const empty = store.selectSnapshot(ProvinciasState.GetProvincias);
    expect(empty).toEqual([]);

    serviceSpy.getProvincias.and.returnValue(of(PROVS).toPromise());
    store.dispatch(new InitProvincias());
    tick();
    const result = store.selectSnapshot(ProvinciasState.GetProvincias);
    expect(result).toEqual(PROVINCIAS);
  }));

  it('InitMunicipios: Carga los municipios obtenidos por servicio ', fakeAsync(() => {
    const empty = store.selectSnapshot(ProvinciasState.GetMunicipios);
    expect(empty).toEqual([]);
    serviceSpy.getMunicipios.and.returnValue(of(MUNIS).toPromise());
    store.dispatch(new InitMunicipios());
    tick();
    const result = store.selectSnapshot(ProvinciasState.GetMunicipios);
    expect(result).toEqual(MUNICIPIOS);
  }));
});
