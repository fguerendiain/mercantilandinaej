import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { CodeDescription, GeoLatLong, Municipio, Municipios, Parametros, Provincia, Provincias } from '../entities/General.model';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ApiServGeoNormalizacionService } from './ApiServGeoNormalizacion.service';


describe('ApiServGeoNormalizacionService', () => {
    let httpClientSpy: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ApiServGeoNormalizacionService;

    const BASE_API = 'https://apis.datos.gob.ar/georef/api';

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

    const GEOLATLONG: GeoLatLong = {
      lat: 123,
      lon: 456
    };

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
    };

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
      httpClientSpy = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ApiServGeoNormalizacionService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });


    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('getProvincias: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/provincias`;
      service.getProvincias();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getProvincias: Se invoca con GET', () => {
      const urlApi  = `${BASE_API}/provincias`;
      service.getProvincias();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getProvincias: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi  = `${BASE_API}/provincias`;
      service.getProvincias().then(response => {
        expect(response).toEqual(PROVS);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(PROVS);
    });


    it('getMunicipios: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/municipios?provincia=123&campos=id,nombre&max=135`;
      service.getMunicipios('123');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getMunicipios: Se invoca con GET', () => {
      const urlApi  = `${BASE_API}/municipios?provincia=123&campos=id,nombre&max=135`;
      service.getMunicipios('123');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getMunicipios: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi  = `${BASE_API}/municipios?provincia=123&campos=id,nombre&max=135`;
      service.getMunicipios('123').then(response => {
        expect(response).toEqual(MUNIS);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(MUNIS);
    });

});
