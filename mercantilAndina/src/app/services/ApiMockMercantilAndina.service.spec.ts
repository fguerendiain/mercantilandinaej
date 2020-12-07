import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Coverage } from '../entities/General.model';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ApiMockMercantilAndinaService } from './ApiMockMercantilAndina.service';
import { of } from 'rxjs';


describe('ApiMockMercantilAndinaService', () => {
    let httpClientSpy: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ApiMockMercantilAndinaService;

    const COVERAGE1: Coverage = {
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

    const COVERAGE2: Coverage = {
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

    const COVERAGES: Coverage[] = [COVERAGE1, COVERAGE2];

    const BASE_API = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
      httpClientSpy = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ApiMockMercantilAndinaService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });


    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('getUserNameAvailability: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/usuarios?nombre=usuario`;
      service.getUserNameAvailability('usuario');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      console.log(req.request.url);
      console.log(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getUserNameAvailability: Se invoca con GET', () => {
      const urlApi  = `${BASE_API}/usuarios?nombre=usuario`;
      service.getUserNameAvailability('usuario');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getUserNameAvailability: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi  = `${BASE_API}/usuarios?nombre=usuario`;
      service.getUserNameAvailability('usuario').then(response => {
        expect(response).toEqual(true);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(of(true).toPromise());
    });


    it('getInsuranceCoverage: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/coberturas`;
      service.getInsuranceCoverage();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      console.log(req.request.url);
      console.log(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getInsuranceCoverage: Se invoca con GET', () => {
      const urlApi  = `${BASE_API}/coberturas`;
      service.getInsuranceCoverage();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getInsuranceCoverage: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi  = `${BASE_API}/coberturas`;
      service.getInsuranceCoverage().then(response => {
        expect(response).toEqual(COVERAGES);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(COVERAGES);
    });

});
