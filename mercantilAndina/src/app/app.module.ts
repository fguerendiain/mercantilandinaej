import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/card/header/header.component';
import { BodyComponent } from './components/card/body/body.component';
import { PersonalDataComponent } from './components/card/body/personal-data/personal-data.component';
import { CoverageSelectComponent } from './components/card/body/coverage-select/coverage-select.component';
import { DetailSummaryComponent } from './components/card/body/detail-summary/detail-summary.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './user/user.state';
import { ProvinciasState } from './provincias/provincias.state';
import { VehicleState } from './vehicles/vehicles.state';
import { ApiMercantilAndinaService } from './services/ApiMercantilAndina.service';
import { ApiMockMercantilAndinaService } from './services/ApiMockMercantilAndina.service';
import { ApiServGeoNormalizacionService } from './services/ApiServGeoNormalizacion.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RouterModule } from '@angular/router';
import { VehicleDataComponent } from './components/card/body/vehicle-data/vehicle-data.component';
import { FormsModule } from '@angular/forms';
import { UserValidationsHandler } from './user/userValidationHandler';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionDataComponent } from './components/card/body/personal-data/ubicacion-data/ubicacion-data.component';
import { ValidationErrorLableComponent } from './components/card/body/share/validation-error-lable/validation-error-lable.component';
import { PasswordStrengthMeterComponent } from './components/card/body/personal-data/password-strength-meter/password-strength-meter.component';
import { CoverageState } from './coverage/coverage.state';
import { CoverageCardComponent } from './components/card/body/coverage-select/coverage-card/coverage-card.component';
import { CoverageCardBodyComponent } from './components/card/body/coverage-select/coverage-card-body/coverage-card-body.component';
import { PaginatorComponent } from './components/card/paginator/paginator.component';



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderComponent,
    BodyComponent,
    PersonalDataComponent,
    CoverageSelectComponent,
    DetailSummaryComponent,
    VehicleDataComponent,
    UbicacionDataComponent,
    ValidationErrorLableComponent,
    PasswordStrengthMeterComponent,
    CoverageCardComponent,
    CoverageCardBodyComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'personal', component: PersonalDataComponent },
      {path: 'vehiculo', component: VehicleDataComponent },
      {path: 'cobertura', component: CoverageSelectComponent },
      {path: 'resumen', component: DetailSummaryComponent },
      {path: '**', redirectTo: 'personal', pathMatch: 'full' }
    ],
    {onSameUrlNavigation: 'reload'}
    ),
    NgxsModule.forRoot([
      UserState,
      ProvinciasState,
      VehicleState,
      CoverageState
    ]),
    NgxsLoggerPluginModule.forRoot({ }),
    NgxsReduxDevtoolsPluginModule.forRoot({ }),
    NgbModule
  ],
  providers: [ApiMercantilAndinaService,
              ApiMockMercantilAndinaService,
              ApiServGeoNormalizacionService,
              UserValidationsHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
