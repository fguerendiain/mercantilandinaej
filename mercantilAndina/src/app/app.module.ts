import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './components/portal/portal.component';
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { HeaderComponent } from './components/card/header/header.component';
import { BodyComponent } from './components/card/body/body.component';
import { RowComponent } from './components/card/body/share/row/row.component';
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    CardComponent,
    PaginatorComponent,
    HeaderComponent,
    BodyComponent,
    RowComponent,
    PersonalDataComponent,
    CoverageSelectComponent,
    DetailSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'personal', component: PersonalDataComponent },
      {path: 'vehiculo', component: VehicleDataComponent },
      {path: 'cobertura', component: CoverageSelectComponent },
      {path: 'resumen', component: DetailSummaryComponent },
      {path: '', redirectTo: 'personal', pathMatch: 'full' },
      {path: '**', component: PageNotFoundComponent },
    ]),
    NgxsModule.forRoot([
      UserState,
      ProvinciasState,
      VehicleState
    ]),
    NgxsLoggerPluginModule.forRoot({ }),
    NgxsReduxDevtoolsPluginModule.forRoot({ }),

  ],
  providers: [ApiMercantilAndinaService,
              ApiMockMercantilAndinaService,
              ApiServGeoNormalizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
