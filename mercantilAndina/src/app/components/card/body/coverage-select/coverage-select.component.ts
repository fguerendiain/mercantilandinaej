import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InitCoverage } from 'src/app/coverage/coverage.actions';
import { CoverageState } from 'src/app/coverage/coverage.state';
import { Coverage } from 'src/app/entities/General.model';
import * as messages from '../../../../../messages.json';

@Component({
  selector: 'app-coverage-select',
  templateUrl: './coverage-select.component.html',
  styleUrls: ['./coverage-select.component.css']
})
export class CoverageSelectComponent implements OnInit {

  @Select(CoverageState.GetMarcas) coveragesList$: Observable<Coverage[]>;

  headerTitle: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.onReloadService();
    this.headerTitle = messages.CoverageSelectComponentHeaderTitle;
  }

  async onReloadService(): Promise<void>{
      await this.store.dispatch(new InitCoverage()).toPromise();
  }
}
