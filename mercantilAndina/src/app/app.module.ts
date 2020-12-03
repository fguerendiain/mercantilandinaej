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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
