import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { ApiMercantilAndinaService } from './ApiMercantilAndina.service';
import { CodeDescription } from '../entities/General.model';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';


describe('ApiMercantilAndinaService', () => {
    let httpClientSpy: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ApiMercantilAndinaService;

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

    const MODELOS: string[] = [
      'GRANDE', 'CHICO', 'ALTO', 'FLACO'
    ];

    const MARCAS: CodeDescription[] = [MARCA1, MARCA2, MARCA3, MARCA4];

    const VERSIONES: CodeDescription[] = [VERSION1, VERSION2, VERSION3, VERSION4];

    const BASE_API = 'https://servicios.qamercantilandina.com.ar/api/v1';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
      httpClientSpy = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ApiMercantilAndinaService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });


    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('getCarBrands: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/vehiculos/marcas`;
      service.getCarBrands();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      console.log(req.request.url);
      console.log(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getCarBrands: Se invoca con GET', () => {
      const urlApi = `${BASE_API}/vehiculos/marcas`;
      service.getCarBrands();
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getCarBrands: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi = `${BASE_API}/vehiculos/marcas`;
      service.getCarBrands().then(response => {
        expect(response).toEqual(MARCAS);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(MARCAS);
    });


    it('getCarModels: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/vehiculos/marcas/123/2018`;
      service.getCarModels('123', '2018');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      console.log(req.request.url);
      console.log(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getCarModels: Se invoca con GET', () => {
      const urlApi = `${BASE_API}/vehiculos/marcas/123/2018`;
      service.getCarModels('123', '2018');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getCarModels: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi = `${BASE_API}/vehiculos/marcas/123/2018`;
      service.getCarModels('123', '2018').then(response => {
        expect(response).toEqual(MODELOS);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(MODELOS);
    });


    it('getCarVersion: Se arma la url correctamente', () => {
      const urlApi  = `${BASE_API}/vehiculos/marcas/123/2018/30`;
      service.getCarVersion('123', '2018', '30');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      console.log(req.request.url);
      console.log(urlApi);
      expect(req.request.url).toEqual(urlApi);
    });

    it('getCarVersion: Se invoca con GET', () => {
      const urlApi = `${BASE_API}/vehiculos/marcas/123/2018/30`;
      service.getCarVersion('123', '2018', '30');
      const req: TestRequest = httpTestingController.expectOne(urlApi);
      expect(req.request.method).toEqual('GET');
    });

    it('getCarVersion: Se desenvuelve la respuesta correctamente', (done: DoneFn) => {
      const urlApi = `${BASE_API}/vehiculos/marcas/123/2018/30`;
      service.getCarVersion('123', '2018', '30').then(response => {
        expect(response).toEqual(VERSIONES);
        done();
      });
      const testRequest: TestRequest = httpTestingController.expectOne(urlApi);
      testRequest.flush(VERSIONES);
    });


});
